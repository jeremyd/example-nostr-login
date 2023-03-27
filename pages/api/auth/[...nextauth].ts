import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {
    verifySignature,
    Event,
} from 'nostr-tools'

// return true if timestampstring is within 10 minutes of now
function isWithinLast10Minutes(timestampString: string) {
    const timestamp = parseInt(timestampString, 10);
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    const isDiff = (diff < 600) && (diff > -600)
    return isDiff
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Nostr",
            credentials: {
                created_at: { label: "created_at", type: "text" },
                content: { label: "content", type: "text" },
                pubkey: { label: "pubkey", type: "text" },
                sig: { label: "sig", type: "text" },
                id: { label: "id", type: "text" },
            },

            async authorize(credentials) {
                if (!credentials?.sig) {
                    return null
                }

                // verify the timestamp.  if not within 10 minutes, reject the event.
                if (!isWithinLast10Minutes(credentials.created_at)) {
                    return null
                }

                var verifyThis: Event = {
                    kind: 22242,
                    created_at: parseInt(credentials.created_at),
                    tags: [],
                    content: credentials.content,
                    pubkey: credentials.pubkey,
                    id: credentials.id,
                    sig: credentials.sig,
                }

                let veryOk = await verifySignature(verifyThis)
                console.log(veryOk)


                if (!veryOk) {
                    return null
                }

                return {
                    id: credentials.pubkey,
                    name: credentials.pubkey,
                    email: credentials.pubkey
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            session.user.name = token.name
            session.user.id = token.id
            session.user.image = ""
            return session
        },
    },
}

export default NextAuth(authOptions)