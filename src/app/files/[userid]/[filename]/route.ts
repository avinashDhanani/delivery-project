import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { stat } from 'fs/promises';

interface FileParams {
  params: {
    userid: string;
    filename: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: FileParams
) {
  try {
    const { userid, filename } = params;

    // Validate userid and filename
    if (!userid || !filename) {
      return NextResponse.json(
        { success: false, message: 'Invalid parameters' },
        { status: 400 }
      );
    }

    // Construct file path
    const filePath = join(process.cwd(), 'files', userid, filename);

    // Check if file exists
    try {
      await stat(filePath);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'File not found' },
        { status: 404 }
      );
    }

    // Read file
    const fileBuffer = await readFile(filePath);

    // Determine content type based on file extension
    const extension = filename.split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';

    switch (extension) {
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'png':
        contentType = 'image/png';
        break;
      case 'pdf':
        contentType = 'application/pdf';
        break;
      case 'doc':
        contentType = 'application/msword';
        break;
      case 'docx':
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
    }

    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });

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
