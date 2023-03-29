import { prisma } from "../src/server/db";

async function main() {
  const insertOperations = [];
  for (let i = 1; i <= 200; i++) {
    const name = `Example ${i}`;
    insertOperations.push(
      prisma.example.create({
        data: {
          name,
        },
      })
    );
  }
  await Promise.all(insertOperations);
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
