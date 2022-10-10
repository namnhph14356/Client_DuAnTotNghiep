import {  ClassType } from "../types/Class";
import instance from "./instance";


export const listClass = () => {
    const url = `/classes`;
    return instance.get(url);
}

export const addClass = (classAdd: ClassType) => {
    const url = `/class`;
    return instance.post(url, classAdd);
}
export const editClass = (classEdit: ClassType) => {
    const url = `/class/${classEdit._id}`;
    return instance.put(url, classEdit);
}


export const removeClass = (id:number) => {
    const url = `/class/${id}`;
    return instance.delete(url);
}
export const getClassById = (id:number) => {
    const url = `/class/${id}`;
    return instance.get(url);
}

