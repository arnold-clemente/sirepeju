import React from 'react'
import { Routes, Route } from 'react-router-dom';

// paginas 
import Login from '../pages/Login';

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes >
    </>
  )
}

export default AuthRoutes
