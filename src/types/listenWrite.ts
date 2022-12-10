export type ListenWriteType = {
    _id?: string,
    audio?: string,
    practiceActivity: any,
    structure: string,
    conversation:any,
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

