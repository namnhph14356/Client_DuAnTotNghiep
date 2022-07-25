
import { AnswerQuizType } from "../types/answerQuiz";
import instance from "./instance";

export const listAnswerQuiz = () => {
    const url = `/answerQuiz`
    return instance.get(url)
}

export const detailAnswerQuiz = (id: string) => {
    const url = `/answerQuiz/${id}`
    return instance.get(url)
}

export const addAnswerQuiz = (data: AnswerQuizType) => {
    const url = `/answerQuiz`
    return instance.post(url,data)
}

export const editAnswerQuiz = (data: AnswerQuizType) => {
    const url = `/answerQuiz/${data._id}`
    return instance.put(url,data)
}

export const removeAnswerQuiz = (id: string) => {
    const url = `/answerQuiz/${id}`
    return instance.delete(url)
}