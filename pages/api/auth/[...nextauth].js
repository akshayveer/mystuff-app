import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import Adapters from 'next-auth/adapters'
// import { PrismaClient } from "@prisma/client"

import prisma from '../../../lib/prisma'

export default NextAuth({
    providers: [
        // OAuth authentication providers...
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        })
    ],
    pages: {
        signIn: "/signIn"
    },
    // callbacks: {
    //     async signIn(user, account, profile) {
    //         console.log("signIn callback made")
    //         const emailRes = await fetch('https://api.github.com/user/emails', {
    //             headers: {
    //                 'Authorization': `token ${account.accessToken}`
    //             }
    //         })
    //         const emails = await emailRes.json()
    //         const primaryEmail = emails.find(e => e.primary).email;

    //         user.email = primaryEmail;

    //         const existingUser = await prisma.user.find({email: user.email})
    //         if (existingUser) {
    //             user.userId = existingUser.userId
    //             console.log("user already exits", user.name)
    //             return true
    //         }
    //         // creating new user
    //         user = await prisma.user.create({
    //             data: {
    //               email: user.email,
    //               name: user.name,
    //               image: user.image,
    //             },
    //           });
    //           return true
    //     }
    // },
    session: {
        jwt: true
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
        verificationOptions: {
            algorithms: ["HS512"]
        }
    },
    adapter: Adapters.Prisma.Adapter({ prisma }),
    // database: process.env.DATABASE_URL
})