"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const data = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    console.log(data);
    if(data?.error) {
      console.log('Error');
      console.log(data.error);
    } else {
      console.log('Success');
      router.push('/home');
    }
  };

    return (
    <div id="login">
      <h1>WELCOME TO SR VAN TRAVELS!</h1>
      <hr />
      <h1>LOGIN TO YOUR ACCOUNT</h1>
      <form
        id="loginForm"
        onSubmit = {onSubmit}
      >
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
} 