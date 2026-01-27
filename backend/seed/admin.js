
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';

// dotenv.config();
// const prisma = new PrismaClient();

// async function main() {
//   const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
//   const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

//   // 1️⃣ Check if admin already exists
//   const existingAdmin = await prisma.user.findUnique({
//     where: { email: adminEmail },
//   });

//   if (existingAdmin) {
//     console.log('⚠️ Admin user already exists. Skipping creation.');
//     return;
//   }

//   // 2️⃣ Hash password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(adminPassword, salt);

//   console.log(`Creating admin user with email: ${adminEmail}`);

//   // 3️⃣ Create User + Admin profile in a transaction
//   const newAdmin = await prisma.$transaction(async (tx) => {
//     const user = await tx.user.create({
//       data: {
//         name: 'Super Admin',
//         email: adminEmail,
//         password: hashedPassword,
//         role: 'ADMIN',        // Enum value
//         status: 'ACTIVE',     // Enum value
//       },
//     });

//     await tx.admin.create({
//       data: {
//         userId: user.id, // Link to created User
//       },
//     });

//     return user;
//   });

//   console.log('✅ Admin user created successfully!');
//   console.log(newAdmin);
// }

// main()
//   .catch((e) => {
//     console.error('❌ Error seeding admin:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
// seedVillage.ts
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  // Example village data (you can customize)
  const villageData = {
    name: 'Sunnyvale',
    latitude: 28.6139,
    longitude: 77.2090,
    regionId: '64f1c3a5e8a4d5001a2b3c4d', // Replace with an actual Region ID from your DB
  };

  // 1️⃣ Check if village already exists
  const existingVillage = await prisma.village.findUnique({
    where: {
      name_regionId: { // Using @@unique([name, regionId])
        name: villageData.name,
        regionId: villageData.regionId,
      },
    },
  });

  if (existingVillage) {
    console.log('⚠️ Village already exists. Skipping creation.');
    return;
  }

  // 2️⃣ Create village
  const newVillage = await prisma.village.create({
    data: villageData,
  });

  console.log('✅ Village created successfully!');
  console.log(newVillage);
}

main()
  .catch((e) => {
    console.error('❌ Error creating village:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
