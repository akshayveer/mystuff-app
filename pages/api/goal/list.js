import { getSession } from "next-auth/client"

import prisma from '../../../lib/prisma'

export default async (req, res) => {
    const session = await getSession({ req })
    if (req.method != 'GET') {
        res.status(400).send({message: 'Only Get requests allowed'})
        return
    }

    let allGoals = []

    if (session) {
      // Signed in
      console.log('Session', JSON.stringify(session, null, 2))
      
      const body = req.body
      console.log("post data", JSON.stringify(body, null, 2))
    //   const user = await prisma.user.findFirst({
    //     where: {email: session?.user?.email}
    //   })
    //   console.log("logged in user", JSON.stringify(user))
    //   const allGoals = await prisma.goal.findMany({
    //     where: {userId: user.id}
    //   })
    //   console.log("all goals", JSON.stringify(allGoals, null, 2))
    //   res.send(JSON.stringify(allGoals))

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