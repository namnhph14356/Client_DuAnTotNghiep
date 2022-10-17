
import { MonthType } from "../types/month";
import instance from "./instance";

export const listMonth = () => {
    const url = `/month`
    return instance.get(url)
}

export const detailMonth = (id: string) => {
    const url = `/month/${id}`
    return instance.get(url)
}

export const addMonth = (data: MonthType) => {
    const url = `/month`
    return instance.post(url,data)
}

export const editMonth = (data: MonthType) => {
    const url = `/month/${data._id}`
    return instance.put(url,data)
}

export const removeMonth = (id: string) => {
    const url = `/month/${id}`
    return instance.delete(url)
}