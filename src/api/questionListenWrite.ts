import { QuizType } from "../types/quiz";
import instance from "./instance";

export const getListQuestionListenWriteById = (id:string) => {
    const url = `/questionListenWrite/${id}`
    return instance.get(url)
}



export const addQuestionListenWrite = (data: any) => {
    const url = `/questionListenWrite`
    return instance.post(url,data)
}

// export const detailQuiz = (id: string) => {
//     const url = `/quizs/${id}`
//     return instance.get(url)
// }

export const editQuestionListenWrite = (data: any) => {
    const url = `/questionListenWrite/${data._id}`
    return instance.put(url,data)
}

export const removeQuestionListenWrite = (id: string) => {
    const url = `/questionListenWrite/${id}`
    return instance.delete(url)
}