import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

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
    database: {
        type: "sqlite",
        database: ":memory:",
        synchronize: true
    },
    pages: {
        signIn: "/signIn"
    },
    callbacks: {
        async signIn(user, account, profile) {
            const emailRes = await fetch('https://api.github.com/user/emails', {
                headers: {
                    'Authorization': `token ${account.accessToken}`
                }
            })
            const emails = await emailRes.json()
            const primaryEmail = emails.find(e => e.primary).email;

            user.email = primaryEmail;
        }
    },
    session: {
        jwt: true
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
        verificationOptions: {
            algorithms: ["HS512"]
        }
    }
    // database: process.env.DATABASE_URL
})