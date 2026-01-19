import { NextRequest, NextResponse } from 'next/server';
import { User, CustomerProfile } from '../../../../../../models';
import { withAdminAuth, AuthenticatedRequest } from '../../../../../../lib/middleware';

interface ApproveUserParams {
  params: {
    id: string;
  };
}

async function approveUserHandler(
  req: AuthenticatedRequest,
  context: ApproveUserParams
): Promise<NextResponse> {
  try {
    const userId = parseInt(context.params.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    // Find the user to approve
    const user = await User.findByPk(userId, {
      include: [{
        model: CustomerProfile,
        as: 'customerProfile',
        required: false
      }]
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent approving admin users
    if (user.role_type === 'admin') {
      return NextResponse.json(
        { success: false, message: 'Cannot approve admin users' },
        { status: 400 }
      );
    }

    // Check if user already has approved KYC
    if (user.kyc_status === 2) {
      return NextResponse.json(
        { success: false, message: 'User is already approved' },
        { status: 400 }
      );
    }

    // Approve the user
    await user.update({
      kyc_status: 2, // Approved
      kyc_reject_message: null, // Clear any previous rejection message
      kyc_reject_at: null, // Clear rejection timestamp
      is_active: true // Ensure user is active
    });

    // Update customer profile KYC status if it exists
    if (user.customerProfile) {
      await user.customerProfile.update({
        kyc_status: 'Approved'
      });
    }

    return NextResponse.json({
      success: true,
      message: 'User approved successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          mobile: user.mobile,
          role_type: user.role_type,
          is_active: user.is_active,
          kyc_status: user.kyc_status,
          customerProfile: user.customerProfile
        }
      }
    });

  } catch (error) {
    console.error('Approve user error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to approve user',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(approveUserHandler);
