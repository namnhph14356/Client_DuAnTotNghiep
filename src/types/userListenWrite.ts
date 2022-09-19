export type UserListenWriteType = {
    _id?: string,
    idListenWrite?: string,
    answerUser: string,
    answerCorrect: string,
    numTrueAnswer: number,
    isCorrect:boolean,
    score?: number,
    createdAt?: string,
    updatedAt?: string
}