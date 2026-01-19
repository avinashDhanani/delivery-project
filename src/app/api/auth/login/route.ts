import { NextResponse } from 'next/server';
import { User, CustomerProfile } from '../../../../models';
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

    // Find user
    const user = await User.findOne({
      where: { email },
      include: [{
        model: CustomerProfile,
        as: 'customerProfile',
        required: false // Make this optional to avoid errors for admin users
      }]
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
        { success: false, message: 'Account is not activated. Please verify OTP first.' },
        { status: 403 }
      );
    }

    // For non-admin users, require OTP verification after login
    if (user.role_type !== 'admin') {
      // Generate OTP for login verification
      const otp = authUtils.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Save OTP in user record
      await user.update({
        otp_code: otp,
        otp_expires_at: expiresAt,
        otp_type: 'login'
      });

      // TODO: Send OTP via SMS/Email service
      console.log(`Login OTP for ${email}: ${otp}`); // For development

      return NextResponse.json({
        success: true,
        message: 'Login initiated. Please verify OTP.',
        data: {
          requires_otp: true,
          user_id: user.id
        }
      });
    }

    // For admin users, generate token directly
    const token = authUtils.generateToken({
      userId: user.id,
      email: user.email,
      role_type: user.role_type
    });

    // Update last login
    await user.update({ last_login_at: new Date() });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          mobile: user.mobile,
          role_type: user.role_type,
          is_active: user.is_active,
          kyc_status: user.kyc_status,
          customerProfile: user.customerProfile || null
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Login failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
