import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import React, { useState } from 'react'
import Layout from "./Layout";
import Navbar from "./Navbar";


const RequireAuth = () => {

  const { auth, setauth } = useAuth();
  //  const [auth, setauth] = useState(useAuth());

  // console.log(auth)
  // const location = useLocation();

  return (

    auth?.status
      ? <>
        <Navbar />
        <Outlet />
      </>
      : <Navigate to="/login" replace />
  )
}

export default RequireAuth