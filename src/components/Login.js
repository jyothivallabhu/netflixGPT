import { useRef, useState } from 'react'
import {BG_URL} from '../utils/constants'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Login = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

  

    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage,setErrorMessage] = useState(null)
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    const email = useRef(null);
    const password = useRef(null)
    const name = useRef(null)

    const handleButtonClick = () => {

        const message = checkValidData(email?.current?.value, password?.current?.value)
        setErrorMessage(message);

        if (message) return;

        if (!isSignInForm) {
            //Signup form
            createUserWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);

            updateProfile(auth.currentUser, {
                displayName: name?.current?.value, photoURL: "https://cdn-icons-png.freepik.com/512/6915/6915987.png"
                }).then(() => {
                    // Profile updated!

                    const { uid, email, displayName,photoURL } = auth.currentUser;
                     dispatch(addUser({uid:uid,email: email, displayName: displayName,photoURL: photoURL } ))
                    
                    navigate("/browse")
                    // ...
                    
                }).catch((error) => {
                    // An error occurred
                   setErrorMessage(error.message)
                });
            
            
            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + '-' + errorMessage)
             
            // ..
        });
        } else {

            //signIn Logic

            signInWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                 setErrorMessage(errorCode+'-'+ errorMessage)
            });
            
        }
        
        
    }

    return (
        <div>
            <Header />

            <div className="absolute">
                <img className=" object-cover max-w-full" src= { BG_URL }  alt="logo" />
            </div>
            <form onSubmit={(e)=>e.preventDefault()} className='w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold test-2xl '>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                {!isSignInForm && <input ref={name} type='text' placeholder='Full Name' className='p-2 my-2 w-full bg-gray-700' />}
                <input ref={email} type='text' placeholder='Email Address' className='p-2 my-2 w-full bg-gray-700' />
                <input ref={password} type='text' placeholder='Password' className='p-2 my-2 w-full bg-gray-700' />
                <p className='text-red-500'>{errorMessage} </p>
                <button onClick={handleButtonClick} className='p-4 my-6 bg-red-700 w-full rounded-lg' >{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
            <p className='cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? 'New User? Click Here to  SignUp' : 'Already Registere? Signin Here'}</p>
            </form>
            


        </div>
    )
} 

export default Login