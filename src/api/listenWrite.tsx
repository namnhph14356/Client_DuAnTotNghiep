import { ListenWriteType } from "../types/listenWrite";
import instance from "./instance";

export const listListenWrite = () => {
    const url = `/listenWrite`
    return instance.get(url)
}

export const detailListenWrite = (id: string) => {
    const url = `/listenWrite/${id}`
    return instance.get(url)
}

export const addListenWrite = (data: ListenWriteType) => {
    const url = `/listenWrite`
    return instance.post(url,data)
}

export const editListenWrite = (data: ListenWriteType) => {
    const url = `/listenWrite/${data._id}`
    return instance.put(url,data)
}

export const removeListenWrite = (id: string) => {
    const url = `/listenWrite/${id}`
    return instance.delete(url)
}