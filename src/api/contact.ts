import instance from "./instance";
import { ContactType } from "../types/contact";


export const listContact = () => {
    const url = `/contact`;
    return instance.get(url);
}

export const addContact = (contact:ContactType) => {
    const url = `/contact`;
    return instance.post(url, contact);
}
export const editContact = (contact:ContactType) => {
    const url = `/contact/${contact._id}`;
    return instance.put(url, contact);
}

export const removeContact = (id:any) => {
    const url = `/contact/${id}`;
    return instance.delete(url);
}
export const getContactById = (id:any) => {
    const url = `/contact/${id}`;
    return instance.get(url);
}
