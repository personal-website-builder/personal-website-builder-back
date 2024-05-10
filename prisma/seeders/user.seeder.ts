import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const userSeeder = async (prisma: PrismaClient) => {
  await prisma.user.upsert({
    where: { email: 'admin@pwb.com' },
    update: {},
    create: {
      email: 'admin@pwb.com',
      name: 'admin',
      password: bcrypt.hashSync('admin', 10),
    },
  });
  await prisma.user.upsert({
    where: { email: 'user@pwb.com' },
    update: {},
    create: {
      email: 'user@pwb.com',
      name: 'user',
      password: bcrypt.hashSync('user', 10),
    },
  });
};
