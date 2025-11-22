'use client'
import {signOut} from 'next-auth/react';

export default function SignOut() {
    return (
        (<button className = "hover:bg-amber-950 hover:text-amber-300" onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`
        })}>Sign Out</button>)
    )
}