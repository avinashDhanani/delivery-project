import { NextResponse } from 'next/server';
import { KycDocument, User } from '../../../../models';
import { fileUploadUtils } from '../../../../lib/fileUpload';
import { withAuth, AuthenticatedRequest } from '../../../../lib/middleware';

async function handler(req: AuthenticatedRequest) {
  try {

    // Parse form data manually for KYC upload
    const formData = await req.formData();
    const doc_type = formData.get('doc_type') as string;
    const user_id = formData.get('user_id') as string || req.user?.userId.toString();
    const file = formData.get('file') as File;

    // Validation
    if (!doc_type) {
      return NextResponse.json(
        { success: false, message: 'Document type is required' },
        { status: 400 }
      );
    }

    // Validate document type
    const allowedTypes = ['Aadhaar_Front', 'Aadhaar_Back', 'PAN', 'GST', 'Bank_Statement', 'Other'];
    if (!allowedTypes.includes(doc_type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid document type' },
        { status: 400 }
      );
    }

    // Check if file was uploaded
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Document file is required' },
        { status: 400 }
      );
    }

    // Save the file with user ID and document type
    const uploadedFile = await fileUploadUtils.saveFile(file, 'file', user_id, doc_type);

    // Check if user already has this document type
    const existingDoc = await KycDocument.findOne({
      where: {
        user_id: req.user.userId,
        doc_type
      }
    });

    if (existingDoc) {
      // Update existing document
      await existingDoc.update({
        file_path: uploadedFile.path,
        uploaded_at: new Date()
      });

      return NextResponse.json({
        success: true,
        message: 'Document updated successfully',
        data: {
          document_id: existingDoc.id,
          doc_type,
          file_path: fileUploadUtils.getFileUrl(uploadedFile.filename, user_id),
          uploaded_at: existingDoc.uploaded_at
        }
      });
    }

    // Create new document record
    const document = await KycDocument.create({
      user_id: req.user.userId,
      doc_type,
      file_path: uploadedFile.path
    });

    // Check if all required documents are uploaded and update kyc_status
    const userDocuments = await KycDocument.findAll({
      where: { user_id: req.user.userId }
    });

    // Required documents: Aadhaar_Front, Aadhaar_Back, PAN
    const requiredDocs = ['Aadhaar_Front', 'Aadhaar_Back', 'PAN'];
    const uploadedDocTypes = userDocuments.map(doc => doc.doc_type);

    const hasAllRequiredDocs = requiredDocs.every(docType =>
      uploadedDocTypes.includes(docType)
    );
    if (hasAllRequiredDocs) {
      // Update user's kyc_status to 1 (submitted)
      await User.update(
        { kyc_status: 1 },
        { where: { id: req.user.userId } }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Document uploaded successfully',
      data: {
        document_id: document.id,
        doc_type,
        file_path: fileUploadUtils.getFileUrl(uploadedFile.filename, user_id),
        uploaded_at: document.uploaded_at,
        kyc_status: hasAllRequiredDocs ? 1 : 0
      }
    });

  } catch (error) {
    console.error('KYC upload error:', error);

    if (error instanceof Error && error.message.includes('Invalid file type')) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('File size too large')) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Document upload failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler);
