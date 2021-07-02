import { getSession } from "next-auth/client"

import prisma from '../../../lib/prisma'


async function listGoalsHandler(req, res) {
    const session = await getSession({ req })
    let allGoals = []

    if (session) {
        // Signed in
        console.log('Session', JSON.stringify(session, null, 2))

        const body = req.body
        console.log("post data", JSON.stringify(body, null, 2))

        allGoals = await prisma.goal.findMany({
            where: {
                user: {
                    email: session?.user?.email
                }
            },
            select: {
                description: true,
                name: true,
                id: true,
                studyPlan: true
            }
        })

    } else {
        // Not Signed in
        allGoals = await prisma.goal.findMany({
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
    }
    console.log("all goals", JSON.stringify(allGoals, null, 2))
    res.send(JSON.stringify(allGoals))
    res.status(200)
    res.end()
}

async function getGoalHandler(req, res, goalId) {

    const session = await getSession({ req })


    const goal = await prisma.goal.findFirst({
        where: {
            id: goalId
        }
    })

    console.log('get goal handler', goal)

    if (goal.accessType === 'public') {
        console.log('publi goal', JSON.stringify(goal, null, 2))
        res.status(200)
        res.send(JSON.stringify(goal))
        res.end()
        return
    }

    const { id } = await prisma.user.findFirst({
        where: { email: session?.user?.email },
        select: { id: true }
    })

    console.log('get goal handler', id)

    if (id && goal.userId === id) {
        console.log('goal', JSON.stringify(goal, null, 2))
        res.status(200)
        res.send(JSON.stringify(goal))
        res.end()
        return
    }

    res.status(404).send({ message: "Not found", "name": "Sorry! Could not found" })
    res.end()

}

async function addGoal(req, res) {
    const session = await getSession({ req })
    if (session) {
        // Signed in
        console.log('Session', JSON.stringify(session, null, 2))

        const body = req.body
        console.log("post data", JSON.stringify(body, null, 2))

        const newGoal = await prisma.goal.create({
            data: {
                name: body.name,
                description: body.description,
                accessType: body.access,
                user: {
                    connect: { email: session?.user?.email }
                }
            }
        })
        res.send(JSON.stringify(newGoal))
        console.log("new goal", JSON.stringify(newGoal, null, 2))
        res.status(200)

    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
}

export default async function handler(req, res) {
    const { params } = req.query


    if (req.method === 'GET') {
        if (params) {
            // get single goal
            console.log('calling get handler')
            await getGoalHandler(req, res, parseInt(params[0]))
            // return

        } else {
            // get all goals
            console.log('calling list handler')
            await listGoalsHandler(req, res)
            // return
        }

    } else if (req.method === 'POST') {
        console.log('calling post handler')
        await addGoal(req, res)
    } else if (req.method === 'DELETE') {
        console.log('calling delete handler')
    } else {
        res.status(400).send({ message: `Unknow method ${res.method}` })
    }

}