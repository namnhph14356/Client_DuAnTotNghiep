import { CommentType } from "../types/comment";
import instance from "./instance";


export const listComment = () => {
    const url = `/comment`;
    return instance.get(url);
}

export const addComment = (comment:CommentType) => {
    const url = `/comment`;
    return instance.post(url, comment);
}
export const editComment = (comment:CommentType) => {
    const url = `/comment/${comment.id}`;
    return instance.put(url, comment);
}

export const removeComment = (id:number) => {
    const url = `/comment/${id}`;
    return instance.delete(url);
}
export const getCommentById = (id:number) => {
    const url = `/comment/${id}`;
    return instance.get(url);
}

