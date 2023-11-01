import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axiosClient from "../utils/axiosClient";
import { signInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export const Oauth = () => {
const dispatch = useDispatch();
    const handleSignInGoogle = async () => {

        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider);

                await axiosClient.post('api/auth/google',{username: result.user.displayName, email:result.user.email, avatar: result.user.photoURL}).
                then((res)=>{
                const {data} = res;
                dispatch(signInSuccess(data));
                Navigate('/');
                });

        } catch (error) {
            
        }
        
    }

  return (
    <button type='button' onClick={handleSignInGoogle} className=' bg-red-600 p-3 rounded-lg text-white uppercase hover:opacity-90'>Continue with Google</button>
  )
}
