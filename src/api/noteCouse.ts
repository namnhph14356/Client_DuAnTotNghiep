import instance from "./instance"
import {NoteCouseType} from "../types/noteCouse";
export const getUserNote = (dayId: string, userId:string) => {
    const url = `/noteCouse/${dayId}/${userId}`
    return instance.get(url);
}

export const userAddNote = (note:NoteCouseType) => {
    const url = "/noteCouse"
    return instance.post(url, note)
}   

export const editUserNote = (note:any) => {
    const url = `/noteCouse/${note.id}`
    return instance.put(url, note)
}