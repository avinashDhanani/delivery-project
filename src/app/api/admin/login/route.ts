import { NextResponse } from 'next/server';
import { User } from '../../../../models';
import { authUtils } from '../../../../lib/auth';
import { LoginRequest } from '../../../../types/user';

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user and ensure they are admin
    const user = await User.findOne({
      where: {
        email,
        role_type: 'admin' // Only allow admin login through this endpoint
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password
    const isValidPassword = await authUtils.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.is_active) {
      return NextResponse.json(
        { success: false, message: 'Account is deactivated. Please contact administrator.' },
        { status: 403 }
      );
    }

    // Generate token for admin
    const token = authUtils.generateToken({
      userId: user.id,
      email: user.email,
      role_type: user.role_type
    });

    // Update last login
    await user.update({ last_login_at: new Date() });

    return NextResponse.json({
      success: true,
      message: 'Admin login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role_type: user.role_type,
          is_active: user.is_active
        },
        token
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Admin login failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
