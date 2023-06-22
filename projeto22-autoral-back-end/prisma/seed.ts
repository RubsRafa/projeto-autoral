import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.postType.createMany({
        data: [
            {
                type: "Text"
            },
            {
                type: 'Image'
            },
            {
                type: 'Video'
            }
        ]
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });