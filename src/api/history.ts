import { HistoryType } from "../types/history";
import instance from "./instance";

export const listHistory = async () => {
    const url = `/history`
    return instance.get(url)
}

export const detailHistoty = async (id: string) => {
    const url = `/history/${id}`
    return instance.get(url)
}

export const addHistory = async (data: HistoryType ) => {
    const url = `/history`
    return instance.post(url,data)
}

export const editHistory = async (data: HistoryType) => {
    const url = `/history/${data._id}`
    return instance.put(url,data)
}

export const removeHistory = async (id: string) => {
    const url = `/history${id}`
    return instance.delete(url)
}