import { message, Modal } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { AppDispatch, RootState } from '../app/store';
import { currentUserSlice } from '../features/Slide/auth/authSlide';
import { UserType } from '../types/user';

type PrivateRouteProps = {
  children: JSX.Element;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const auth = useAppSelector(((item: RootState) => item.auth.value)) as UserType
  if (auth.role !== "2") {
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
  }, [])

  return props.children
}

export const PrivateRouteLearning = (props: PrivateRouteProps) => {
  const isUser = localStorage.getItem("tokenUser") ? JSON.parse(String(localStorage.getItem("tokenUser"))) : "";
  if (!isUser) {
    message.error("Bạn cần đăng nhập để tiếp tục !")
    return <Navigate to="/signin" />
  }

  return props.children
}