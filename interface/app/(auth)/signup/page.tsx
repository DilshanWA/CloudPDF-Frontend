'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';

export default function SignupPage() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Add signup logic here

    // On success redirect to login
    router.push('/login');
  };

  return (
    <div className='bg-white w-[500px] h-auto text-center p-10 rounded-lg '>
      <img src="/Logo/logo.png" alt="CloudPDF Logo" className='w-23 h-15 mx-auto mb-5' />
        <h1 className='text-3xl font-bold text-center'>Create Your Account</h1>
        <p>Please fill in your details to create an account.</p>
        <form className='mt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="text" placeholder='Name' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'/>
            <input type="email" placeholder='Email' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'/>
            <input type="password" placeholder='Password' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'/>
            <button type="submit" className='w-full cursor-pointer bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition'>Sign Up</button>
        </form>
        <p className='mt-4'>Have an account? <a href="/login" className='text-red-500 font-bold'>Login</a></p>

    </div>
  );
}
