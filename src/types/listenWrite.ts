export type ListenWriteType = {
    _id?: string,
    area?:string,
    category: string,
    content?: [
        {
            name:string,
            text:string,
            answer?: string
        } | any
    ],
    audio: string,
    timeLimit?: string,
    createdAt?: string,
    updatedAt?: string
}


export type QuestionAnswerListenWriteType = {
    question:{
        _id: string,
        text: string,
        name: string,
        idListenWrite: string,
        createdAt?: string,
        updatedAt?: string
    },
    answer?:{
        _id: string,
        answer: string[],
        idQuestion: string,
        createdAt?: string,
        updatedAt?: string
    }
}

