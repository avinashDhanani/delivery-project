import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'delivery_dev',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  dialect: 'postgres',
  logging: false,
});

async function main() {
  console.log('🌱 Starting admin user seed...');

  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Hash the admin password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('Dev@1234', saltRounds);
    console.log('✅ Admin password hashed');

    // First, create or find the admin role group
    const [roleGroupResult] = await sequelize.query(`
      INSERT INTO role_groups (name, description, is_active, created_at, updated_at)
      VALUES ('Admin', 'Administrator role with full system access', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT (name) DO UPDATE SET
        description = EXCLUDED.description,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id;
    `) as [{ id: number }[], unknown];

    const roleGroupId = roleGroupResult[0]?.id;
    console.log('✅ Admin role group created/found with ID:', roleGroupId);

    // Create the admin user
    const [adminUserResult] = await sequelize.query(`
      INSERT INTO users (
        role_group_id, email, password, role_type, is_active,
        kyc_status, created_at, updated_at
      ) VALUES (
        $1, 'admin_delivery@yopmail.com', $2, 'admin', true,
        1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO UPDATE SET
        password = EXCLUDED.password,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, email;
    `, {
      bind: [roleGroupId, hashedPassword]
    }) as [{ id: number; email: string }[], unknown];

    const adminUser = adminUserResult[0];
    console.log('✅ Admin user created/updated:', adminUser);

    console.log('🎉 Admin user seed completed successfully!');
    console.log('📧 Admin Email: admin_delivery@yopmail.com');
    console.log('🔒 Admin Password: Dev@1234');
  } catch (error) {
    console.error('❌ Admin seed failed:', error);
    process.exit(1);
  }
}

main()
  .catch(e => {
    console.error('❌ Admin seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await sequelize.close();
  });
