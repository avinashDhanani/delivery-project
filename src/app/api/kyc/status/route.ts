import { NextResponse } from 'next/server';
import { User, KycDocument, CustomerProfile } from '../../../../models';
import { withAuth, AuthenticatedRequest } from '../../../../lib/middleware';

async function handler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user with customer profile and KYC documents
    const user = await User.findByPk(req.user.userId, {
      include: [
        {
          model: CustomerProfile,
          as: 'customerProfile'
        },
        {
          model: KycDocument,
          as: 'kycDocuments',
          attributes: ['id', 'doc_type', 'uploaded_at']
        }
      ]
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Check mandatory documents
    const uploadedDocs = user.kycDocuments?.map(doc => doc.doc_type) || [];
    const mandatoryDocs = ['Aadhaar_Front', 'Aadhaar_Back', 'PAN'];
    const missingDocs = mandatoryDocs.filter(doc => !uploadedDocs.includes(doc));

    // Determine KYC status
    let kycStatus = 'pending';
    if (missingDocs.length === 0) {
      kycStatus = user.customerProfile?.kyc_status?.toLowerCase() || 'pending';
    }

    return NextResponse.json({
      success: true,
      data: {
        kyc_status: kycStatus,
        mandatory_documents: {
          required: mandatoryDocs,
          uploaded: uploadedDocs.filter(doc => mandatoryDocs.includes(doc)),
          missing: missingDocs
        },
        documents: user.kycDocuments?.map(doc => ({
          id: doc.id,
          doc_type: doc.doc_type,
          uploaded_at: doc.uploaded_at
        })) || [],
        customer_profile: user.customerProfile ? {
          id: user.customerProfile.id,
          company_name: user.customerProfile.company_name,
          gst_no: user.customerProfile.gst_no,
          address: user.customerProfile.address,
          city: user.customerProfile.city,
          zip_code: user.customerProfile.zip_code,
          kyc_status: user.customerProfile.kyc_status
        } : null
      }
    });

  } catch (error) {
    console.error('KYC status error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get KYC status',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);
