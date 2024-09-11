
import './App.css'
import Home from './Components/Home'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {
  

  return (
      <div className='w-screen h-screen'>
        
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
