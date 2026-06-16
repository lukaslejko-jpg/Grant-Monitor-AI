import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const sources = await prisma.source.findMany({
    where: { active: true },
    orderBy: { lastCheckedAt: "asc" },
    take: 25
  });

  for (const source of sources) {
    console.log(`Monitoring ${source.name} (${source.url})`);
    await prisma.checkRun.create({
      data: {
        sourceId: source.id,
        status: "QUEUED",
        message: "Worker skeleton: sem sa pripojí Playwright fetch, robots.txt kontrola, snapshot diff a AI analýza."
      }
    });
  }

  console.log(`Queued ${sources.length} source checks.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
