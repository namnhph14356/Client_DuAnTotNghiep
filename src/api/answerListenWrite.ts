

import instance from "./instance";

export const listAnswerListenWrite = () => {
    const url = `/answerListenWrite`
    return instance.get(url)
}

export const listAnswerListenWriteById = (id: string) => {
    const url = `/answerListenWrite/${id}`
    return instance.get(url)
}

export const addAnswerListenWrite = (data: any) => {
    const url = `/answerListenWrite`
    return instance.post(url,data)
}

export const editAnswerListenWrite = (data: any) => {
    const url = `/answerListenWrite/${data.idQuestion}`
    return instance.put(url,data)
}

export const removeAnswerListenWrite = (id: string) => {
    const url = `/answerListenWrite/${id}`
    return instance.delete(url)
}