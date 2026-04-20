import { prisma } from "./db";

export async function getMyBuilds(userId: string) {
    return prisma.build.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc'},
        include: {
            user: { select: { email: true } },
            components: {
                include: {
                    component: {
                        select: { name: true, type: true, price: true }
                    }
                }
            }
            
        }
    })
}