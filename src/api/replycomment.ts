import { ReplyCommentType } from "../types/replycomment";
import instance from "./instance";


export const listReplyComment = () => {
    const url = `/reply`;
    return instance.get(url);
}

export const addReplyComment = (comment:ReplyCommentType) => {
    const url = `/reply`;
    return instance.post(url, comment);
}
export const editReplyComment = (comment:ReplyCommentType) => {
    const url = `/reply/${comment._id}`;
    return instance.put(url, comment);
}

export const removeReplyComment = (id:number) => {
    const url = `/reply/${id}`;
    return instance.delete(url);
}
export const getReplyCommentById = (id:number) => {
    const url = `/reply/${id}`;
    return instance.get(url);
}

