import React from 'react'
import { Link } from 'react-router-dom'

export const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className=' text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form className='flex flex-col gap-4'>
          <input type="text" placeholder="Username" name="username" id="username" 
          className='border p-3 rounded-lg' />  
               <input type="text" placeholder="Email" name="email" id="email" 
          className='border p-3 rounded-lg' />  
               <input type="text" placeholder="Password" name="password" id="password" 
          className='border p-3 rounded-lg' />   

          <button type="button" 
          className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-85'>Sign Up</button> 
        </form>

          <div className='flex gap-3 mt-5'> 
            <p>Have an account?</p>
            <Link to={"/sign-in"}>
              <span className=' text-blue-600'>Sign In</span>
            </Link>
          </div>
    </div>
  )
}
