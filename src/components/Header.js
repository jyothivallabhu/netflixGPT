import React from 'react'
import { LOGO, DUMMYUSERICON } from '../utils/constants'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate()
  
  const user = useSelector((store)=>store.user)
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
    
  }
  return (
     <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
          <img className=" w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      
      {user &&
        <div className='flex'>
        <img
          className="hidden md:block w-12 h-12"
          alt="usericon"
          src={DUMMYUSERICON}
        />
        <button className='text-white font-bold' onClick={handleSignOut}>SignOut</button>
      </div>
      }
      
    </div>
    
  )
}

export default Header