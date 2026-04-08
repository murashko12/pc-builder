import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/db";
import bcrypt from "bcryptjs";

export const {} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Пароль',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || typeof credentials.email !== 'string') {
                    return null
                }

                if (!credentials?.password || typeof credentials.password !== 'string') {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!user?.password) {
                    return null
                }

                const valid = await bcrypt.compare(credentials.password, user?.password)

                if (!valid) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }
        })
    ],
    session: { strategy: 'jwt' },
    pages: {
        signIn: "/login"
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }
            return token
            
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.name = token.name
            }
            return session;
        }
    }
})