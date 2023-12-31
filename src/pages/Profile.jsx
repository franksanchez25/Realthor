import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import { useForm } from '../hooks/useForm';
import { deleteUserFailure, deleteUserSuccess, signInFailure, signOutFailure, signOutSuccess, startDeleteUser, startSignout, startUserUpdate, updateUserFailure, updateUserSuccess } from '../redux/user/userSlice';
import axiosClient from '../utils/axiosClient';
import { Link } from 'react-router-dom';
export const Profile = () => {
  const { user } = useSelector((state) => ({user: state.persistedReducer.user}));

  const {loading, error} = user;

  const [file, setfile] = useState(undefined);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false)
  const [uploadedImageUrl, setuploadedImageUrl] = useState();
  const [updateSuccess, setupdateSuccess] = useState(false);
  const fileRef = useRef();

const dispatch = useDispatch();

   const  [formValues, handleInputChange] = useForm({});

 
   console.log(loading)

  useEffect(() => {
    if (file) {

      handleUploadImage(file);
     
    }
  }, [file])

  const handleUploadImage = (file)=> {

    const storage = getStorage(app);

    const fileName = new Date().getTime() + file.name;
    const storeReferences = ref(storage,`avatars/${fileName}`);
    const uploadTask = uploadBytesResumable(storeReferences,file);

    uploadTask.on('state_changed',(snapshot)=> {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setuploadProgress(Math.round(progress))
            },(error)=>{
              setfileUploadError(true)
            },

            ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then
              ((downloadURL) => 
              setuploadedImageUrl(downloadURL)
              
             );
            }
    )
  };

const handleSubmit = async (e)=> {

  e.preventDefault();

  try {

      dispatch(startUserUpdate());
    if (uploadedImageUrl) {

     formValues.avatar = uploadedImageUrl;
      
    }


   await axiosClient.put(`api/user/update/${user?.currentUser.user_id}`,formValues).then((res)=>{
      
      const {data} = res;
      
      dispatch(updateUserSuccess(data));
      setupdateSuccess(true);

     });
    
  } catch (err) {
   
     if (err.response.data.error) {
        if (Array.isArray(err.response.data.error.errors)) {

         dispatch(updateUserFailure(err.response.data.error.errors)); 

        } 
   
       }else {
    
           dispatch(updateUserFailure([err.response.data])); 
        
        }
  }

}

const handleDeleteUser = async (e) => {
  e.preventDefault();

  try {
    dispatch(startDeleteUser());

    axiosClient.delete(`api/user/delete/${user?.currentUser.user_id}`,{withCredentials:true}).then( (res)=> {

      const {data} = res;

        dispatch(deleteUserSuccess(data));

    } )

    
  } catch (err) {


    if (err.response.data.error) {
        if (Array.isArray(err.response.data.error.errors)) {

         dispatch(deleteUserFailure(err.response.data.error.errors)); 

        } 
   
       }else {
           dispatch(deleteUserFailure([err.response.data])); 
        }  
  }
}

const handleSignout = async (e) => {

      e.preventDefault();

      try {

        dispatch(startSignout());
      axiosClient.get('api/user/signout').then((res)=>{
        const {data} = res
        dispatch(signOutSuccess())
       
      })
      } catch (err) {
         if (err.response.data.error) {
        if (Array.isArray(err.response.data.error.errors)) {

         dispatch(signOutFailure(err.response.data.error.errors)); 

        } 
   
       }else {
           dispatch(signOutFailure([err.response.data])); 
        }
      }

    }

  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>

        <form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
          <input type="file" onChange={(e)=> setfile(e.target.files[0])} ref={fileRef}  hidden accept='image/*'/>
          <img className=' rounded-full h-28 object-cover cursor-pointer self-center'
          src={ uploadedImageUrl || user?.currentUser.avatar} alt="avatar" onClick={()=> fileRef.current.click()}  />
          <p className=' text-sm self-center'>
            {fileUploadError ? (
            <span className=' text-red-700'>Error uploading image 
            (image must be less than 2MB!)
            </span>
            ): uploadProgress > 0 && uploadProgress < 100 ?(
              <span className=' text-slate-600'>
                { `uploading ${uploadProgress} %` }
              </span>
              ) : uploadProgress === 100 ? (
                <span className=' text-green-600'>
                  successfully uploaded!
                </span>
              ) : (
              ''
              )}
           </p>
          <input className=' border p-3 rounded-lg' 
          defaultValue={user.currentUser.username} 
           type="text" name="username" 
           onChange={handleInputChange}
           placeholder='Username' />

          <input className=' border p-3 rounded-lg' 
          defaultValue={user.currentUser.email} 
          type="text" name="email" 
          onChange={handleInputChange}
          placeholder='Email' />

          <input className=' border p-3 rounded-lg' 
          type="password" name="password" 
          onChange={handleInputChange}
          placeholder='Password' />

          <button 
          className=' bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-85' disabled={loading} type="submmit">{loading?'Updating...':'Update'}</button>
         <Link to='/create-listing'
          className=' bg-green-700 text-white rounded-lg text-center p-3 uppercase hover:opacity-90 disabled:opacity-85'>Create Listing</Link>
        
        </form>
        

        <div className=' flex justify-between mt-5'>
          <span className=' text-red-600 cursor-pointer' onClick={handleDeleteUser}>Delete Account</span>
          <span className=' text-red-600 cursor-pointer' onClick={handleSignout}>Signout</span>
        </div>
          { error && error.map(err => {
                  return <span key={err?.msg} className=' text-red-600 mt-5'>{err?.msg}</span> })  }

          <span className='text-green-600 mt-2'>{updateSuccess ? 'User updated successfully...': ''}</span>
    </div>
  )
}
