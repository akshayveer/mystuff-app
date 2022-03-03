
import prisma from "./prisma";

export async function listPublicGoals() {
    const allGoals = await prisma.goal.findMany({
        where: {
            accessType: "public"
        },
        select: {
            description: true,
            name: true,
            id: true,
            studyPlan: {
                select: {
                    duration: true,
                    completedTasks: true
                }
            }
        },
        take: 10,
    })
    return allGoals;
}

export async function getPublicGoal(goalId) {
    const goal = await prisma.goal.findFirst({
        where: {
            id: parseInt(goalId)
        }
    })
    return goal
}