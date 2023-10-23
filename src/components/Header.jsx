import React from 'react'
import { Link } from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import { useSelector } from 'react-redux'



export const Header = () => {

const { user } = useSelector((state) => ({user: state.persistedReducer.user}));


  return (
   <header className=' bg-slate-200 shadow-md'>
        <div className=' flex justify-between flex-wrap items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className=' font-bold text-sm sm:text-3xl'>
                <span className=' text-slate-500'>Real</span>
                <span className=' text-slate-700'>thor</span>
            </h1>
            </Link>
            <form className=' bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type="text" 
            placeholder='Search...' 
            className=' bg-transparent focus:outline-none w-24 sm:w-64'
            />
            <FaSearch className=' text-slate-600'/>
            </form>
            <ul className='flex gap-4'>
               
                <Link to='/' className='mt-4'>
                <li className=' hidden sm:inline text-slate-700 hover:underline '>Home</li>
                </Link>
               
                <Link to='/about' className='mt-4'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
               
                <Link to='/profile' className=' mt-4'>   

                {
                    user.currentUser 
                    ? 
                    (<img className=' rounded-full w-11 h-11 object-cover' src={user.currentUser.avatar} />) 
                    :
                    <li className=' sm:inline text-slate-700 hover:underline'>Sign In</li>

                }
                </Link>

            </ul>
        </div>
   </header>
  )
}
