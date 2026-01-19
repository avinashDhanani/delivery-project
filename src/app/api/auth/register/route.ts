import { NextResponse } from 'next/server';
import { User } from '../../../../models';
import { authUtils } from '../../../../lib/auth';
import { RegisterRequest } from '../../../../types/user';

export async function POST(request: Request) {
  try {
    const body: RegisterRequest = await request.json();
    const { first_name, last_name, email, phone, password } = body;

    // Validation
    if (!first_name || !last_name || !email || !phone || !password) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await authUtils.hashPassword(password);

    // Get default role group (assuming ID 1 exists for customers)
    // In a real app, you'd create this dynamically or have it predefined
    const roleGroupId = 1; // Default customer role group

    // Generate OTP
    const otp = authUtils.generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user (inactive until OTP verification) with OTP data
    const user = await User.create({
      role_group_id: roleGroupId,
      email,
      password: hashedPassword,
      mobile: phone,
      role_type: 'customer',
      is_active: false, // Will be activated after OTP verification
      kyc_status: 0,
      otp_code: otp,
      otp_expires_at: expiresAt,
      otp_type: 'registration',
      first_name,
      last_name
    });

    // TODO: Send OTP via SMS/Email service
    console.log(`OTP for ${email}: ${otp}`); // For development

    return NextResponse.json({
      success: true,
      message: 'Registration initiated. Please verify OTP sent to your email/phone.',
      data: {
        user_id: user.id,
        email: user.email,
        requires_otp: true
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Registration failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
