import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create root menus
  const systemManagement = await prisma.menu.create({
    data: {
      name: 'System Management',
      depth: 0,
    },
  });

  const systems = await prisma.menu.create({
    data: {
      name: 'Systems',
      depth: 1,
      parentId: systemManagement.id,
    },
  });

  const systemCode = await prisma.menu.create({
    data: {
      name: 'System Code',
      depth: 2,
      parentId: systems.id,
    },
  });

  await prisma.menu.createMany({
    data: [
      {
        name: 'Code Registration',
        depth: 3,
        parentId: systemCode.id,
      },
      {
        name: 'Code Registration - 2',
        depth: 3,
        parentId: systemCode.id,
      },
      {
        name: 'Properties',
        depth: 2,
        parentId: systems.id,
      },
      {
        name: 'Menus',
        depth: 2,
        parentId: systems.id,
      },
      {
        name: 'API List',
        depth: 2,
        parentId: systems.id,
      },
      {
        name: 'Users & Groups',
        depth: 1,
        parentId: systemManagement.id,
      },
      {
        name: 'Users',
        depth: 2,
        parentId: systemManagement.id,
      },
      {
        name: 'User Account Registration',
        depth: 3,
        parentId: systemManagement.id,
      },
      {
        name: 'Groups',
        depth: 2,
        parentId: systemManagement.id,
      },
      {
        name: 'User Group Registration',
        depth: 3,
        parentId: systemManagement.id,
      },
      {
        name: 'Competition',
        depth: 1,
        parentId: systemManagement.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
