import React, { useEffect } from 'react'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
   
import { addUser, removeUser } from '../utils/userSlice'
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

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

  const handleGptSearchClick = () => {
    
    dispatch(toggleGptSearchView())
  }

  const hadleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }
  return (
     <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
          <img className=" w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      
      {user &&
        <div className='flex'>
          
          
          
          <select className='py-2 px-2 rounded' onChange={hadleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>


          <button
            onClick={handleGptSearchClick}
            className='px-2 py-2 m-2 rounded-lg bg-blue-500'>GPT Search</button>
        <img
          className="hidden md:block w-12 h-12"
          alt="usericon"
          src={user.photoURL}
        />
        <button className='text-white font-bold' onClick={handleSignOut}>SignOut</button>
      </div>
      }
      
    </div>
    
  )
}

export default Header