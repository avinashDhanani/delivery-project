import { NextResponse } from 'next/server';
import { User } from '../../../../models';
import { authUtils } from '../../../../lib/auth';
import { ForgotPasswordRequest } from '../../../../types/user';

export async function POST(request: Request) {
  try {
    const body: ForgotPasswordRequest = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        success: true,
        message: 'If the email exists, a password reset OTP has been sent.'
      });
    }

    // Generate OTP
    const otp = authUtils.generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP in user record
    await user.update({
      otp_code: otp,
      otp_expires_at: expiresAt,
      otp_type: 'forgot_password'
    });

    // TODO: Send OTP via SMS/Email service
    console.log(`Password reset OTP for ${email}: ${otp}`); // For development

    return NextResponse.json({
      success: true,
      message: 'If the email exists, a password reset OTP has been sent.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
