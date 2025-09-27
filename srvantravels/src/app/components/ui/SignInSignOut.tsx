import Link from 'next/link';
import {authOptions} from '@/lib/auth';
import {getServerSession} from "next-auth";
import SignOut from './SignOut';

export default  async function SignInSignOut() {
 const session = await getServerSession(authOptions);

 return (
    <>
        { session?.user ?  <SignOut/> : (
            <Link href = '/login'>Login</Link>
        ) }
    </>
 )
}