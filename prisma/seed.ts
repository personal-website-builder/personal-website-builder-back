import { PrismaClient } from '@prisma/client';
import { userSeeder } from './seeders/user.seeder';
const prisma = new PrismaClient();
async function main() {
  await userSeeder(prisma);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
