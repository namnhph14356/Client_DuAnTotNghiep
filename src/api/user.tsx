// import { UserType } from "../types";
import { UserType } from "../types/category";
import instance from "./instance";


export const login = (user:any) => {
    const url = "/signin";
    return instance.post(url, user);
}

export const register = (user:any) => {
    const url = "/signup";
    return instance.post(url, user);
}

export const getListUser = () => {
    const url = "/users";
    return instance.get(url);
}

export const addUser = (user:UserType) => {
    const url = "/users";
    return instance.post(url, user);
} 

export const editUser = (user:UserType) => {
    const url = `/users/${user._id}`;
    return instance.put(url, user);
} 

export const removeUser = (id:any) => {
    const url = `/users/${id}`;
    return instance.delete(url);
} 

export const forgotPass = (email:any) => {
    const url = `/sendMail`;
    return instance.post(url, email);
} 

export const newPassword = (user:any) => {
    const url = `/newPassword`;
    return instance.put(url, user);
} 

export const changeOTP = (user:any) => {
    console.log(user);
    
    const url = `/changeOTP`;
    return instance.post(url, user);
} 