import React from 'react'
import { useSelector } from 'react-redux';

export const Profile = () => {
  const { user } = useSelector((state) => ({user: state.persistedReducer.user}));

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>

        <form className=' flex flex-col gap-4'>
          <img className=' rounded-full h-28 object-cover cursor-pointer self-center' src={user?.currentUser.avatar} alt="avatar" />
          <input className=' border p-3 rounded-lg' type="text" name="username" placeholder='Username' />
          <input className=' border p-3 rounded-lg' type="text" name="email" placeholder='Email' />
          <input className=' border p-3 rounded-lg' type="password" name="password" placeholder='Password' />

          <button className=' bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-85' type="button">Update</button>
        </form>

        <div className=' flex justify-between mt-5'>
          <span className=' text-red-600 cursor-pointer'>Delete Account</span>
          <span className=' text-red-600 cursor-pointer'>Signout</span>
        </div>
    </div>
  )
}
