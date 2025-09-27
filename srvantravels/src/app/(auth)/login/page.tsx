import React from 'react';
import Login from '../../components/form/Login';  
import Link from 'next/link';
export default function Page() {
   return (
    <>
        <Login />
        <Link href = "/register" className = "hover:bg-amber-200">No account? Register</Link>
    </>
   ) 
   
}