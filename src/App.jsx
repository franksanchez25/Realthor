import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'

import { Profile } from './pages/Profile'
import { About } from './pages/about'
import { Header } from './components/Header'
import { SignUp } from './pages/SignUp'
import { Private } from './Routes/Private'
export const App = () => {
  return (
     <BrowserRouter>

      <Header/>


    {/* //Todo: Move this route to public and private route */}

        <Routes>
          <Route path='/' element={<Home/>} />     
          <Route path='/sign-in' element={<SignIn/>} />     
          <Route path='/sign-up' element={<SignUp/>} />   
          
          <Route element={<Private/>}> 
            <Route path='/profile' element={<Profile/>} />     
          </Route>  
          
          <Route path='/about' element={<About/>} />     
        </Routes>
     </BrowserRouter>
  )
}
