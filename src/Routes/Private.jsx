import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"




export const Private = () => {

const { user } = useSelector((state) => ({user: state.persistedReducer.user}));
    return user?.currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
}
