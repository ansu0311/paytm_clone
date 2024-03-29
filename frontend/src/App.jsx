import React from 'react'
import { BrowserRouter , Route , Routes, Navigate } from "react-router-dom"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import Dashboard from "./Pages/Dashboard"
import SendMoney from "./Pages/SendMoney"

const App = () => {
  return (
    <>
    <BrowserRouter>
     <Routes>
       <Route path="/signup" element={<Signup />} />
       <Route path="/signin" element={<Signin />} />
       <Route path="/Dashboard" element={<Dashboard />} />
       <Route path="/send" element={<SendMoney />} />
       <Route path="*" element={<Navigate to="/Dashboard" />} />
     </Routes>
   </BrowserRouter>
    </>
  )
}

export default App