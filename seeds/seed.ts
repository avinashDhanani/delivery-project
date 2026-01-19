import Test from '../src/models/Test';
import sequelize from '../src/lib/database';

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Sync database (create tables if they don't exist)
    await sequelize.sync({ force: false });
    console.log('✅ Database synchronized');

    // Create sample test records
    const [test1, created1] = await Test.upsert({
      name: 'Sample Test Record 1',
      description: 'This is the first test record',
      value: 42,
      isActive: true,
    });

    const [test2, created2] = await Test.upsert({
      name: 'Sample Test Record 2',
      description: 'This is the second test record',
      value: 100,
      isActive: true,
    });

    console.log('✅ Test records created/updated:', { test1, test2 });
    console.log('🎉 Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await sequelize.close();
  });
