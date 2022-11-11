
import { DayType } from "../types/day";
import instance from "./instance";

export const listDay = () => {
    const url = `/day`
    return instance.get(url)
}

export const listDayByWeek = (id: string) => {
    const url = `/day/week/${id}`
    return instance.get(url)
}

export const detailDay = (id: any) => {
    const url = `/day/${id}`
    return instance.get(url)
}

export const addDay = (data: DayType) => {
    const url = `/day`
    return instance.post(url,data)
}

export const editDay = (data: DayType) => {
    const url = `/day/${data._id}`
    return instance.put(url,data)
}

export const removeDay = (id: string) => {
    const url = `/day/${id}`
    return instance.delete(url)
}

export const dayBiggest = () => {
    const url = `/dayBiggest`;
    return instance.get(url)
}