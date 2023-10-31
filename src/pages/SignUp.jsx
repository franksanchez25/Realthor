import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import axiosClient from '../utils/axiosClient'
import { Oauth } from '../components/Oauth'

export const SignUp = () => {

  const [error, seterror] = useState([]);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const signUpformFields = {
    username:'',
    email:   '',
    password:''
  }
  const  [{username, email, password}, handleInputChange] = useForm(signUpformFields);

  

  const handleSignUp = async (event) => {
    event.preventDefault();

    setloading(true);


    try {

    await axiosClient.post('api/auth/signup',{username:username,passwordbody:password,email:email}).then((res)=>{
      const {data} = res;
  
      setloading(false);
      navigate('/sign-in');
    });


  
    } catch (err) {

      if (err.response.data.error) {
        setloading(false);

        if (Array.isArray(err.response.data.error.errors)) {
          seterror(err.response.data.error.errors);
        } else {
          seterror([{ msg: err.response.data.error }]);
        }
   
       }
    } 
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className=' text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSignUp}>
          <input type="text" placeholder="Username" name="username" id="username" 
          className='border p-3 rounded-lg' onChange={handleInputChange} value={username}/>  
               <input type="text" placeholder="Email" name="email" id="email" 
          className='border p-3 rounded-lg' onChange={handleInputChange} value={email}/>  
               <input type="password" placeholder="Password" name="password"  id="password" 
          className='border p-3 rounded-lg' onChange={handleInputChange} value={password}/>   

          <button disabled={loading} type="submit"
          className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-85'
          >{loading?'Loading...':'Sign Up'}</button>
          <Oauth/>
        </form>

          <div className='flex gap-3 mt-5'> 
            <p>Have an account?</p>
            <Link to={"/sign-in"}>
              <span className=' text-blue-600'>Sign In</span>
            </Link>
            {
              <p>{
                error.map(err => {
                  return <p key={err.msg} className=' text-red-600'>{err.msg} *</p>
                })
                }</p>
            }
          </div>
    </div>
  )
}
