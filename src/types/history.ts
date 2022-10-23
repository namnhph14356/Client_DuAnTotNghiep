import { UserType } from "./user"

export type HistoryType = {
    _id?: string,
    user: string | UserType,
    learningProgress: string,
    practiceActivity: string,
    totalPoint: number,
    totalCorrect: number,
    result: number,
    type: number,   
    createdAt?: string,
    updatedAt?: string
}