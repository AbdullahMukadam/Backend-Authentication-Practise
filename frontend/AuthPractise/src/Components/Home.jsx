import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function Home() {
  const {auth} = useContext(AuthContext)
 if(auth){
  return (
    <h1 className='text-xl text-red-600 text-center'>Welcome User</h1>
  )
 }
 return (
  <h1 className='text-xl text-red-600 text-center'>Please Login</h1>
 )
}

export default Home