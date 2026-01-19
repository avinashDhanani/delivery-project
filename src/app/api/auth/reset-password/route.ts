import { NextResponse } from 'next/server';
import { User } from '../../../../models';
import { authUtils } from '../../../../lib/auth';

interface ResetPasswordRequest {
  email: string;
  otp: string;
  new_password: string;
}

export async function POST(req: Request) {
  try {
    const body: ResetPasswordRequest = await req.json();
    const { email, otp, new_password } = body;

    // Validate required fields
    if (!email || !otp || !new_password) {
      return NextResponse.json(
        { success: false, message: 'Email, OTP, and new password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (new_password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Verify OTP
    if (!user.otp_code || !user.otp_expires_at) {
      return NextResponse.json(
        { success: false, message: 'No OTP found. Please request a new password reset.' },
        { status: 400 }
      );
    }

    if (user.otp_code !== otp) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // Check if OTP is expired
    if (new Date() > user.otp_expires_at) {
      return NextResponse.json(
        { success: false, message: 'OTP has expired. Please request a new password reset.' },
        { status: 400 }
      );
    }

    // Check if OTP type is for forgot password
    if (user.otp_type !== 'forgot_password') {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP type' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await authUtils.hashPassword(new_password);

    // Update password and clear OTP
    await user.update({
      password: hashedPassword,
      otp_code: null,
      otp_expires_at: null,
      otp_type: null,
      updated_at: new Date()
    });

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.',
      data: {
        email: user.email
      }
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to reset password',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
