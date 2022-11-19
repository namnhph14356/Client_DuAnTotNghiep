

import { WeekType } from "../types/week";
import instance from "./instance";

export const listWeek = () => {
    const url = `/week`
    return instance.get(url)
}

export const listWeekByMonth = (id: string) => {
    const url = `/week/month/${id}`
    return instance.get(url)
}

export const weekBiggest = () => {
  const url = `/week/weekBiggest`
  return instance.get(url)
}

export const detailWeek = (id: string) => {
    const url = `/week/${id}`
    return instance.get(url)
}

export const addWeek = (data: WeekType) => {
    const url = `/week`
    return instance.post(url,data)
}

export const editWeek = (data: WeekType) => {
    const url = `/week/${data._id}`
    return instance.put(url,data)
}

export const removeWeek = (id: string) => {
    const url = `/week/${id}`
    return instance.delete(url)
}