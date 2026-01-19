import { NextResponse } from 'next/server';
import { User, CustomerProfile } from '../../../../models';
import { withAuth, AuthenticatedRequest } from '../../../../lib/middleware';

async function getHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await User.findByPk(req.user.userId, {
      include: [{
        model: CustomerProfile,
        as: 'customerProfile'
      }],
      attributes: ['id', 'email', 'mobile', 'role_type', 'is_active', 'kyc_status']
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          mobile: user.mobile,
          role_type: user.role_type,
          is_active: user.is_active,
          kyc_status: user.kyc_status
        },
        customer_profile: user.customerProfile
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get profile',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function putHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      company_name,
      gst_no,
      address,
      city,
      zip_code,
      ref_name,
      ref_mobile
    } = body;

    // Find or create customer profile
    let customerProfile = await CustomerProfile.findOne({
      where: { user_id: req.user.userId }
    });

    if (customerProfile) {
      // Update existing profile
      await customerProfile.update({
        company_name,
        gst_no,
        address,
        city,
        zip_code,
        ref_name,
        ref_mobile
      });
    } else {
      // Create new profile
      customerProfile = await CustomerProfile.create({
        user_id: req.user.userId,
        company_name,
        gst_no,
        address,
        city,
        zip_code,
        ref_name,
        ref_mobile,
        credit_limit: 0,
        wallet_balance: 0,
        terms_agreed: false
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        customer_profile: customerProfile
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update profile',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const PUT = withAuth(putHandler);
