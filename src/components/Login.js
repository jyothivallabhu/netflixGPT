import { useState } from 'react'
import {BG_URL} from '../utils/constants'
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm ] = useState(true)
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
    return (
        <div>
            <Header />

            <div className="absolute">
                <img className=" object-cover max-w-full" src= { BG_URL }  alt="logo" />
            </div>
            <form className='w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold test-2xl '>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                <input type='text' placeholder='Email Address' className='p-2 my-2 w-full bg-gray-700' />
                <input type='text' placeholder='Email Address' className='p-2 my-2 w-full bg-gray-700' />
                <button className='p-4 my-6 bg-red-700 w-full rounded-lg' >{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
            <p className='cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? 'New User? Click Here to  SignUp' : 'Already Registere? Signin Here'}</p>
            </form>
            


        </div>
    )
} 

export default Login