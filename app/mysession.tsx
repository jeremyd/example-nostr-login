"use client"
import { useSession } from 'next-auth/react'
import { signIn, signOut } from "next-auth/react"
import Image from 'next/image';

const doNip07Login = async () => {
    //const pubKey = await (window as any).nostr.getPublicKey();
    let signThis = {
        kind: 22242,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: 'login to example',
    }

    let useMe = await (window as any).nostr.signEvent(signThis)
    console.log(useMe)

    signIn("credentials", {
        kind: useMe.kind,
        created_at: useMe.created_at,
        content: useMe.content,
        pubkey: useMe.pubkey,
        sig: useMe.sig,
        id: useMe.id,
    })
}

export default function ShowSession() {
    const { data: session, status } = useSession();
    if (!session) {
        return (
            <>
                <div>
                    <button
                        onClick={doNip07Login}
                    >
                        <span>nip07</span>
                        <Image src="nostr_logo_prpl_wht_rnd.svg" alt="nip07" width={30} height={30} />
                        sign in

                    </button>
                </div>
            </>
        )
    } else if (session?.user) {
        return (
            <>
                <div>Welcome {session.user.name}
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        type="button"
                    >
                        sign out
                    </button>
                </div>
            </>
        )
    } else {
        return (<> </>)
    }
}