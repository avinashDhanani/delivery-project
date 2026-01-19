// File upload utilities
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';

export interface UploadedFile {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
}

export class FileUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileUploadError';
  }
}

export const fileUploadUtils = {
  // Parse multipart form data (simplified version)
  async parseFormData(request: Request): Promise<{ fields: Record<string, string>, files: Record<string, UploadedFile> }> {
    const contentType = request.headers.get('content-type') || '';

    if (!contentType.includes('multipart/form-data')) {
      throw new FileUploadError('Content-Type must be multipart/form-data');
    }

    // For Next.js app router, we need to handle form data differently
    // This is a simplified implementation - in production, consider using a proper multipart parser
    try {
      const formData = await request.formData();
      const fields: Record<string, string> = {};
      const files: Record<string, UploadedFile> = {};

      for (const [key, value] of Array.from(formData.entries())) {
        if (value instanceof File) {
          // Handle file upload
          const file = await this.saveFile(value, key);
          files[key] = file;
        } else {
          // Handle text field
          fields[key] = value as string;
        }
      }

      return { fields, files };
    } catch (error) {
      throw new FileUploadError('Failed to parse form data');
    }
  },

  // Save uploaded file
  async saveFile(file: File, fieldName: string, userId?: string, docType?: string): Promise<UploadedFile> {
    // Validate file type (allow images and PDFs)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      throw new FileUploadError('Invalid file type. Only JPEG, PNG, and PDF files are allowed.');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new FileUploadError('File size too large. Maximum size is 5MB.');
    }

    // Generate unique filename based on user ID and document type
    const fileExtension = file.name.split('.').pop() || 'unknown';
    let filename: string;
    let uploadDir: string;

    if (userId && docType) {
      // Create directory structure: /files/:userid/document_name_unique_code
      const uniqueCode = randomBytes(8).toString('hex');
      filename = `${docType.toLowerCase()}_${uniqueCode}.${fileExtension}`;
      uploadDir = join(process.cwd(), 'files', userId.toString());
    } else {
      // Fallback to old structure for backward compatibility
      const randomName = randomBytes(16).toString('hex');
      filename = `${randomName}.${fileExtension}`;
      uploadDir = join(process.cwd(), 'uploads', 'kyc');
    }

    // Create upload directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const filePath = join(uploadDir, filename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    return {
      filename,
      originalName: file.name,
      mimetype: file.type,
      size: file.size,
      path: filePath
    };
  },

  // Get file URL (for serving files)
  getFileUrl(filename: string, userId?: string): string {
    if (userId) {
      return `/files/${userId}/${filename}`;
    }
    return `/api/uploads/kyc/${filename}`;
  }
};
