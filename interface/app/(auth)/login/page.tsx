'use client'
import React from 'react'

export default function page() {

   const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
   }

  return (
    <div className='bg-white w-[500px] h-auto text-center p-10 rounded-lg'> 
        <img src="/Logo/logo.png" alt="CloudPDF Logo" className='w-23 h-15 mx-auto mb-5' />
        <h2 className='text-3xl font-bold text-center'>Welcome Back !</h2>
        <p>Please login with your personal info to continue.</p>
        <form className='mt-6 flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
            <input type="email" placeholder='Email' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'/>
            <input type="password" placeholder='Password' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'/>
            <p className='text-left'><a href="/forgot-password" className='text-black text-sm'>Forgot Password?</a></p>
            <button type="submit" className='w-full cursor-pointer bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition'>Login</button>
        </form>
        <p className='mt-4'>Don't have an account? <a href="/signup" className='text-red-500 font-bold'>Sign Up</a></p>

    </div>
  )
}
