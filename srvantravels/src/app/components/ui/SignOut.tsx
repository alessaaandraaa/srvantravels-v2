'use client'
import {signOut} from 'next-auth/react';

export default function SignOut() {
    return (
        (<button onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`
        })}>Sign Out</button>)
    )
}