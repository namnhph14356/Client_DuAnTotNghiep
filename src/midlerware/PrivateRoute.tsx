import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppDispatch } from '../app/store';
import { currentUserSlice } from '../features/Slide/auth/authSlide';

type PrivateRouteProps = {
  children: JSX.Element;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const isUser = localStorage.getItem("tokenUser") ? JSON.parse(String(localStorage.getItem("tokenUser"))).user.role : "";
  if (isUser == 0) {
    return <Navigate to="/" />
  }
  return props.children
}

export const PrivateRouteHomePage = (props: PrivateRouteProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = async () => {
    await dispatch(currentUserSlice())
  }
  useEffect(() => {
    currentUser();
  },[])

  return props.children
}