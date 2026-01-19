// Authentication middleware
import { NextRequest, NextResponse } from 'next/server';
import { authUtils } from './auth';
import { JWTPayload } from '../types/auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export function withAuth(handler: (req: AuthenticatedRequest, context: any) => Promise<NextResponse>) {
  return async (req: NextRequest, context: any) => {
    try {
      const authHeader = req.headers.get('authorization');
      console.log("authHeader :: ", authHeader)
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { success: false, message: 'Authorization token required' },
          { status: 401 }
        );
      }

      const token = authHeader.replaceAll("Bearer ", "").trim(); // Remove 'Bearer ' prefix
      console.log("token :: ", token)
      const decoded = authUtils.verifyToken(token);
      console.log("decoded :: ", decoded)
      console.log("decoded.userId :: ", decoded?.userId)
      if (!decoded) {
        return NextResponse.json(
          { success: false, message: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      // Add user to request object
      (req as AuthenticatedRequest).user = decoded;

      return handler(req as AuthenticatedRequest, context);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { success: false, message: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}

export function withOptionalAuth(handler: (req: AuthenticatedRequest, context: any) => Promise<NextResponse>) {
  return async (req: NextRequest, context: any) => {
    try {
      const authHeader = req.headers.get('authorization');

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const decoded = authUtils.verifyToken(token);

        if (decoded) {
          (req as AuthenticatedRequest).user = decoded;
        }
      }

      return handler(req as AuthenticatedRequest, context);
    } catch (error) {
      console.error('Optional auth middleware error:', error);
      return handler(req as AuthenticatedRequest, context);
    }
  };
}

export function withAdminAuth(handler: (req: AuthenticatedRequest, context: any) => Promise<NextResponse>) {
  return async (req: NextRequest, context: any) => {
    try {
      const authHeader = req.headers.get('authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { success: false, message: 'Authorization token required' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      const decoded = authUtils.verifyToken(token);

      if (!decoded) {
        return NextResponse.json(
          { success: false, message: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      // Check if user is admin
      if (decoded.role_type !== 'admin') {
        return NextResponse.json(
          { success: false, message: 'Admin access required' },
          { status: 403 }
        );
      }

      // Add user to request object
      (req as AuthenticatedRequest).user = decoded;

      return handler(req as AuthenticatedRequest, context);
    } catch (error) {
      console.error('Admin auth middleware error:', error);
      return NextResponse.json(
        { success: false, message: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}
