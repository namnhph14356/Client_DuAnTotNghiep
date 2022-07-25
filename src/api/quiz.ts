import { QuizType } from "../types/quiz";
import instance from "./instance";

export const listQuiz = () => {
    const url = `/quizs`
    return instance.get(url)
}

export const detailQuiz = (id: string) => {
    const url = `/quizs/${id}`
    return instance.get(url)
}

export const addQuiz = (data: QuizType) => {
    const url = `/quizs`
    return instance.post(url,data)
}

export const editQuiz = (data: QuizType) => {
    const url = `/quizs/${data._id}`
    return instance.put(url,data)
}

export const removeQuiz = (id: string) => {
    const url = `/quizs/${id}`
    return instance.delete(url)
}