import React, { useEffect } from 'react'
import { LOGO, DUMMYUSERICON } from '../utils/constants'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
   
import { addUser, removeUser } from '../utils/userSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const { uid, email, displayName,photoURL } = user;
                dispatch(addUser({uid:uid,email: email, displayName: displayName, photoURL:photoURL} ))
                navigate("/browse")
            } else {
                // User is signed out
                // ...
                dispatch(removeUser())
               navigate("/")
            }
        });
    //unsubscribe when component unmounts
    return () => unsubscribe();
    },[])
  
  const user = useSelector((store)=>store.user)
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
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