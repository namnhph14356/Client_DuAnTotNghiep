import { UserQuizType } from "../types/userQuiz";
import instance from "./instance";  


export const listUserQuiz = async () => {
    const url = `/userQuiz`
    return instance.get(url)
}

export const detailUserQuiz = async (id: string) => {
    const url = `/userQuiz/${id}`
    return instance.get(url)
}

export const addUserQuiz = async (data: UserQuizType) => {
    const url = `/userQuiz`
    return instance.post(url,data)
}

export const editUserQuiz = async (data: UserQuizType) => {
    const url = `/userQuiz/${data._id}`
    return instance.put(url,data)
}

export const removeUserQuiz = async (id: string) => {
    const url = `/userQuiz${id}`
    return instance.delete(url)
}