import { CategoryType } from "../types/category";
import instance from "./instance";


export const listCategory = () => {
    const url = `/categories`;
    return instance.get(url);
}

export const addCategory = (category:CategoryType) => {
    const url = `/categories`;
    return instance.post(url, category);
}
export const editCategory = (category:CategoryType) => {
    const url = `/categories/${category._id}`;
    return instance.put(url, category);
}

export const removeCategory = (id:any) => {
    const url = `/categories/${id}`;
    return instance.delete(url);
}
export const getCategoryById = (id:any) => {
    const url = `/categories/${id}`;
    return instance.get(url);
}