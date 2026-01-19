import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { withAuth, AuthenticatedRequest } from '../../../../../lib/middleware';

async function handler(req: AuthenticatedRequest, { params }: { params: { filename: string } }) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const { filename } = params;

    if (!filename) {
      return NextResponse.json(
        { success: false, message: 'Filename is required' },
        { status: 400 }
      );
    }

    // Security: Prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json(
        { success: false, message: 'Invalid filename' },
        { status: 400 }
      );
    }

    const filePath = join(process.cwd(), 'uploads', 'kyc', filename);

    try {
      const fileBuffer = await readFile(filePath);

      // Determine content type based on file extension
      let contentType = 'application/octet-stream';
      if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
        contentType = 'image/jpeg';
      } else if (filename.endsWith('.png')) {
        contentType = 'image/png';
      } else if (filename.endsWith('.pdf')) {
        contentType = 'application/pdf';
      }

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `inline; filename="${filename}"`,
          'Cache-Control': 'private, max-age=3600' // Cache for 1 hour
        }
      });

    } catch (fileError) {
      return NextResponse.json(
        { success: false, message: 'File not found' },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('File serving error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to serve file',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);
