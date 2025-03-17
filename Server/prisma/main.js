const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
    const result = await prisma.Leaderboard.findMany({});
    console.dir(result);}

main();