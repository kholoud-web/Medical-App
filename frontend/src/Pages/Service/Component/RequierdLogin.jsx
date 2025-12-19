import React from 'react'
import { Link } from 'react-router-dom'

export default function RequierdLogin() {
  return (
    <div className='flex md:flex-row flex-col  items-center justify-between gap-3  bg-[#0249D70D] p-4 rounded-xl w-[85%] mx-auto'>
        <div className='flex items-start gap-2 '>
           <img src='/Vector.png' className='w-5 h-5' alt=''/>
           <div> <span>Login Required for Full Access</span>
            <p>You're currently browsing in guest mode. Create an account or login to access all features and book appointments.</p></div>
        </div>
        <div className='flex items-center justify-between gap-2 '>
            <Link to='/login'  className='py-2 px-6 font-bold rounded-xl bg-primary-blue text-white'>Login</Link>
            <Link to='/register'  className=' btn text-nowrap py-2 px-4'>Create Account</Link>
        </div>
    </div>
  )
}
