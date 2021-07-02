import { getSession } from "next-auth/client"

import prisma from '../../../lib/prisma'

export default async (req, res) => {
    const session = await getSession({ req })
    if (session) {
      // Signed in
      console.log('Session', JSON.stringify(session, null, 2))
      if (req.method != 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' })
        return
      }
      const body = req.body
      console.log("post data", JSON.stringify(body, null, 2))
      // const user = await prisma.user.findFirst({
      //   where: {email: session?.user?.email}
      // })
      // console.log("logged in user", JSON.stringify(user))
      // const newGoal = await prisma.goal.create({
      //   data: {
      //     name: body.name,
      //     description: body.description,
      //     duration: body.duration,
      //     tasks: body.tasks,
      //     completedTasks: body.completedTasks,
      //     userId: user.id
      //   }
      // })
      const newGoal = await prisma.goal.create({
        data: {
          name: body.name,
          description: body.description,
          user: {
            connect: {email: session?.user?.email}
          }
        }
      })
      console.log("new goal", JSON.stringify(newGoal, null, 2))
      res.status(200)
      
    } else {
      // Not Signed in
      res.status(401)
    }
    res.end()
  }