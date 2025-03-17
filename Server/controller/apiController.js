const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    getResult: async (req, res) => {
        try {
        const result = await prisma.leaderboard.findFirst({
            where: {
                id: '007b4c77-55c7-4c0d-91f6-94fc952da3d2',
            }
        });
        res.status(200).json(result);
        console.dir(result);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        }
    },
    
    postResult: async (req, res) => {
        try {
        const {result} = req.params;
        console.log(result);
        if(result === "win") {
            const newResult = await prisma.leaderboard.update({ 
                where: {
                    id: '007b4c77-55c7-4c0d-91f6-94fc952da3d2'
                },
                data: { 
                    wins: {
                    increment: 1, 
                } },
            }
        );
        console.dir(newResult);
        } else {
            const newResult = await prisma.leaderboard.update({ 
                where: {
                    id: '007b4c77-55c7-4c0d-91f6-94fc952da3d2'
                },
                data: { 
                    losses: {
                    increment: 1, 
                } },
            });
            console.dir(newResult);
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        }
    },
}