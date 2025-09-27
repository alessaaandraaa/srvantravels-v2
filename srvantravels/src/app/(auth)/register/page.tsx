import React from 'react';
import Register from '../../components/form/Register';  
import Link from 'next/link';
export default function Page() {
   return (
    <>
        <Register />
        <Link href = "/login" className = "hover:bg-amber-200">Already have an account?</Link> 
    </>
   ) 
   
}