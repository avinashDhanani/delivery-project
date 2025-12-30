import { NextResponse } from 'next/server';
import Test from '../../../models/Test';
import sequelize from '../../../lib/database';

export async function GET() {
  try {
    // Test database connection by fetching all test records
    const tests = await Test.findAll({
      order: [['createdAt', 'DESC']]
    });

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: tests,
      count: tests.length
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, value } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      );
    }

    const newTest = await Test.create({
      name,
      description: description || undefined,
      value: value || 0,
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Test record created successfully',
      data: newTest
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create test record',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
