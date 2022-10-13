import { CourseType } from "../types/course";
import instance from "./instance";

export const listCourse = () => {
    const url = `/course`
    return instance.get(url)
}

export const detailCourse = (id: string) => {
    const url = `/course/${id}`
    return instance.get(url)
}

export const addCourse = (data: CourseType) => {
    const url = `/course`
    return instance.post(url,data)
}

export const editCourse = (data: CourseType) => {
    const url = `/course/${data._id}`
    return instance.put(url,data)
}

export const removeCourse = (id: string) => {
    const url = `/course/${id}`
    return instance.delete(url)
}