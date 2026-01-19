import { NextRequest, NextResponse } from 'next/server';
import { User, CustomerProfile } from '../../../../models';
import { withAdminAuth, AuthenticatedRequest } from '../../../../lib/middleware';
import { Op } from 'sequelize';

interface UsersQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  role_type?: 'customer' | 'admin' | 'public';
  kyc_status?: string;
  is_active?: string;
  sort_by?: 'created_at' | 'email' | 'role_type' | 'kyc_status';
  sort_order?: 'ASC' | 'DESC';
}

async function getUsersHandler(req: AuthenticatedRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role_type = searchParams.get('role_type') as 'customer' | 'admin' | 'public' | null;
    const kyc_status = searchParams.get('kyc_status');
    const is_active = searchParams.get('is_active');
    const sort_by = (searchParams.get('sort_by') || 'created_at') as 'created_at' | 'email' | 'role_type' | 'kyc_status';
    const sort_order = (searchParams.get('sort_order') || 'DESC') as 'ASC' | 'DESC';

    // Build where conditions
    const whereConditions: any = {};

    // Exclude admin users from the list (admins shouldn't see other admins)
    whereConditions.role_type = { [Op.ne]: 'admin' };

    // Search filter
    if (search) {
      whereConditions[Op.or] = [
        { email: { [Op.iLike]: `%${search}%` } },
        { mobile: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Role type filter
    if (role_type) {
      whereConditions.role_type = role_type;
    }

    // KYC status filter
    if (kyc_status !== null && kyc_status !== undefined) {
      whereConditions.kyc_status = parseInt(kyc_status);
    }

    // Active status filter
    if (is_active !== null && is_active !== undefined) {
      whereConditions.is_active = is_active === 'true';
    }

    // Calculate offset
    const offset = (page - 1) * limit;

    // Build order
    const order: any = [[sort_by, sort_order]];

    // Get users with pagination
    const { rows: users, count: totalCount } = await User.findAndCountAll({
      where: whereConditions,
      include: [{
        model: CustomerProfile,
        as: 'customerProfile',
        required: false
      }],
      order,
      limit,
      offset,
      attributes: {
        exclude: ['password', 'otp_code', 'otp_expires_at', 'otp_type']
      }
    });

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users,
        pagination: {
          current_page: page,
          per_page: limit,
          total_count: totalCount,
          total_pages: totalPages,
          has_next_page: hasNextPage,
          has_prev_page: hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve users',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(getUsersHandler);
