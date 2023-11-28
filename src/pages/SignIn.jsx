import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import axiosClient from '../utils/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { Oauth } from '../components/Oauth';



export const SignIn = () => {
 

const { user } = useSelector((state) => ({user: state.persistedReducer.user}));

const {loading, error} = user;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const signUpformFields = {
    username:'',
    email:   '',
    password:''
  }
  const  [{email, password}, handleInputChange] = useForm(signUpformFields);

  

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      
     dispatch(signInStart())
      await axiosClient.post('api/auth/signin',{email:email, passwordbody:password}).then((res)=>{
      const {data} = res;
      console.log(data);
    dispatch(signInSuccess(data))
    });
    

    
    navigate('/');

  
    } catch (err) {
  
      console.log(err);
      if (err.response.data.error) {
        if (Array.isArray(err.response.data.error.errors)) {

          console.log(err.response.data.error.errors)
         dispatch(signInFailure(err.response.data.error.errors)); 

        } 
   
       }else {

          console.log([err.response.data])
          console.log('Error 2')
           dispatch(signInFailure([err.response.data])); 
           console.log(error)
        }

    
    } 
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className=' text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSignUp}>
               <input type="text" placeholder="Email" name="email" id="email" 
          className='border p-3 rounded-lg' onChange={handleInputChange} value={email}/>  
               <input type="password" placeholder="Password" name="password"  id="password" 
          className='border p-3 rounded-lg' onChange={handleInputChange} value={password}/>   

          <button disabled={loading} type="submit"
          className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-85'
          >
            {loading?'Loading...':'Sign In'}
            </button>
            <Oauth/>
        </form>

          <div className='flex gap-3 mt-5'> 
            <p>Don't have an account?</p>
            <Link to={"/sign-up"}>
              <span className=' text-blue-600'>Sign Up</span>
            </Link>
            
              {
                
               error && error.map(err => {
                  return <span key={err} className=' text-red-600'>{err?.msg}</span>
                })
                }
            
          </div>
    </div>
  )
}
