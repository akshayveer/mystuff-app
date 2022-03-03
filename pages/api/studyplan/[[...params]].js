import { getSession } from "next-auth/client"

import prisma from '../../../lib/prisma'


async function getStuyPlanHandler(req, res, goalId) {

    const session = await getSession({ req })

    console.log("sessions is", session)


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

    if (!session) {
        res.status(404).send({ message: "Not found", "name": "Sorry! Could not found" })
        res.end()
        return
    }

    const { id } = await prisma.user.findFirst({
        where: { email: session?.user?.email || null },
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

async function updateStudyPlan(req, res) {
    const session = await getSession({ req })
    if (session) {
        // Signed in
        console.log('Session', JSON.stringify(session, null, 2))

        const body = req.body
        console.log("post data", JSON.stringify(body, null, 2))

        const newStudyPlan = await prisma.studyplan.create({
            data: {
                duration: body.duration,
                goal: {
                    connect: { goalId: body.goal }
                }
            }
        })
        res.send(JSON.stringify(newStudyPlan))
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
            // get single study plan
            console.log('calling get handler')
            await getStuyPlanHandler(req, res, parseInt(params[0]))
            // return

        }
    } else if (req.method === 'POST') {
        console.log('calling post handler')
        await updateStudyPlan(req, res)
    } else if (req.method === 'DELETE') {
        console.log('calling delete handler')
    } else {
        res.status(400).send({ message: `Unknow method ${res.method}` })
    }

}