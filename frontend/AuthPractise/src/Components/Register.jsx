import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Api } from '../Api/Api'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

function Register() {
    const {setAuth} = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    /* useEffect(() => {
        console.log("Auth state changed:", auth);
      }, [auth]);  */

    const handleSubmit = (e) => {
        e.preventDefault()
    
        axios.post(Api.RegisterApi, {
            username: username,
            email: email,
            password: password
        })
            .then((response) => {
                if(response.data){
                    setAuth(true)
                    //console.log("Auth after setting to true:", auth);
                    navigate("/")
                }
                setError("")
            })
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data.error || "All Fields are Required")
                } else {
                    setError("An Error Occured")
                }
            })

    }
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit}>
                <div class="flex items-center justify-center">
                    <div
                        class="bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200"
                    >
                        <div
                            class="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col"
                        >
                            <svg viewBox="0 0 24 24" class="h-12 w-12 text-white" fill="currentColor">
                                <g>
                                    <path
                                        d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                                    ></path>
                                </g>
                            </svg>
                            <h1 class="text-white text-2xl">Sign up to Twitter</h1>
                            {error && <span className='text-red-600'>{error}</span>}
                            <input
                                class="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                                placeholder="Username"
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            
                            <input
                                class="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                                placeholder="Email"
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                class="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                                placeholder="Password"
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                class="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                                type="submit"
                                id="submit"
                            />
                            <p>
                                Already Have an Account
                                <Link
                                    class="font-semibold text-white hover:text-blue-500 transition-all duration-200"
                                    to={"/login"}
                                >Login Here</Link
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register