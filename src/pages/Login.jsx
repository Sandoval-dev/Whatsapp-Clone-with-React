import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase';
import {useDispatch} from 'react-redux'




const Login = () => {

    const dispatch = useDispatch();


    const signInGoogleFunc = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {

                const user = result.user;
                dispatch({type:'LOGIN',payload:user})

            })

    }


    return (
        <div className='h-screen bg-gray-100 flex items-center justify-center'>
            <div className='w-1/3 h-2/3 bg-white rounded-lg flex flex-col items-center justify-center gap-2'>
                <img className='w-28' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png' alt='' />
                <div className='font-bold text-3xl'>Whatsapp Login</div>
                <div onClick={signInGoogleFunc} className='mt-5 border px-4 py-2 border-green-600 p-2 rounded-lg bg-green-600 text-white font-bold hover:bg-white hover:text-green-600 cursor-pointer transition ease-in-out hover:scale-105'>Login with Google</div>
            </div>
        </div>
    )
}

export default Login