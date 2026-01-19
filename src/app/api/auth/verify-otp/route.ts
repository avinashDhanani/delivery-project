import { NextResponse } from 'next/server';
import { User } from '../../../../models';
import { authUtils } from '../../../../lib/auth';
import { VerifyOtpRequest, ResetPasswordRequest } from '../../../../types/user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp, type, new_password } = body;

    // Validation
    if (!email || !otp || !type) {
      return NextResponse.json(
        { success: false, message: 'Email, OTP, and type are required' },
        { status: 400 }
      );
    }

    // Find user with valid OTP
    const user = await User.findOne({
      where: {
        email,
        otp_code: otp,
        otp_type: type,
        otp_expires_at: {
          [require('sequelize').Op.gt]: new Date()
        }
      },
      include: ['customerProfile']
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Clear OTP fields (mark as used)
    await user.update({
      otp_code: null,
      otp_expires_at: null,
      otp_type: null
    });

    let responseData: any = {};
    let message = '';

    switch (type) {
      case 'registration':
        // Activate user account
        await user.update({ is_active: true });
        message = 'Account activated successfully. Please login.';
        responseData = {
          user_id: user.id,
          email: user.email,
          activated: true
        };
        break;

      case 'login':
        // Generate JWT token
        const token = authUtils.generateToken({
          userId: user.id,
          email: user.email,
          role_type: user.role_type
        });

        // Update last login
        await user.update({ last_login_at: new Date() });

        message = 'Login successful';
        responseData = {
          user: {
            id: user.id,
            email: user.email,
            mobile: user.mobile,
            role_type: user.role_type,
            is_active: user.is_active,
            kyc_status: user.kyc_status,
            customerProfile: user.customerProfile
          },
          token,
          kyc_required: user.kyc_status === 0
        };
        break;

      case 'forgot_password':
        // Check if new password is provided
        if (!new_password) {
          return NextResponse.json(
            { success: false, message: 'New password is required for password reset' },
            { status: 400 }
          );
        }

        if (new_password.length < 6) {
          return NextResponse.json(
            { success: false, message: 'Password must be at least 6 characters long' },
            { status: 400 }
          );
        }

        // Hash new password
        const hashedPassword = await authUtils.hashPassword(new_password);

        // Update password
        await user.update({ password: hashedPassword });

        message = 'Password reset successfully';
        responseData = {
          password_reset: true
        };
        break;

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid OTP type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message,
      data: responseData
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'OTP verification failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
