import { NextRequest, NextResponse } from 'next/server';
import { User, CustomerProfile } from '../../../../../../models';
import { withAdminAuth, AuthenticatedRequest } from '../../../../../../lib/middleware';

interface RejectUserParams {
  params: {
    id: string;
  };
}

interface RejectUserRequest {
  reject_message: string;
}

async function rejectUserHandler(
  req: AuthenticatedRequest,
  context: RejectUserParams
): Promise<NextResponse> {
  try {
    const userId = parseInt(context.params.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    // Parse request body
    const body: RejectUserRequest = await req.json();
    const { reject_message } = body;

    // Validate rejection message
    if (!reject_message || reject_message.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Rejection message is required' },
        { status: 400 }
      );
    }

    // Find the user to reject
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

    // Prevent rejecting admin users
    if (user.role_type === 'admin') {
      return NextResponse.json(
        { success: false, message: 'Cannot reject admin users' },
        { status: 400 }
      );
    }

    // Check if user is already rejected
    if (user.kyc_status === 3) {
      return NextResponse.json(
        { success: false, message: 'User is already rejected' },
        { status: 400 }
      );
    }

    // Reject the user
    await user.update({
      kyc_status: 3, // Rejected
      kyc_reject_message: reject_message.trim(),
      kyc_reject_at: new Date(),
      is_active: true // Keep user active but require re-KYC
    });

    // Update customer profile KYC status if it exists
    if (user.customerProfile) {
      await user.customerProfile.update({
        kyc_status: 'Rejected'
      });
    }

    return NextResponse.json({
      success: true,
      message: 'User rejected successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          mobile: user.mobile,
          role_type: user.role_type,
          is_active: user.is_active,
          kyc_status: user.kyc_status,
          kyc_reject_message: user.kyc_reject_message,
          kyc_reject_at: user.kyc_reject_at,
          customerProfile: user.customerProfile
        }
      }
    });

  } catch (error) {
    console.error('Reject user error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to reject user',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(rejectUserHandler);
