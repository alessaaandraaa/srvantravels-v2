
import {authOptions} from '@/lib/auth';
import {getServerSession} from "next-auth";
import SignInSignOut from '../../components/ui/SignInSignOut';

export default async function Home() {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (session?.user) {
        return (
            <div>
                <p>ILOY SI CLIFF</p>
                <p>AGREE WITH ME PLS {session?.user?.name}</p>
                {(!session?.user?.contact_number) ? (<p>No contact number added.</p>) : (<p>Contact number added.</p>)}

                <SignInSignOut/>

            </div>
        )
    }

    return (
        <>
                <SignInSignOut/>
            <p>Please log in.</p>
        </>
    )
    
}