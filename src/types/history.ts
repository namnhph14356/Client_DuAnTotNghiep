import { UserType } from "./user"

export type HistoryType = {
    _id?: string,
    user: string | UserType,
    learningProgress?: string,
    practiceActivity?: string,
    score: number,
    totalScore: number,
    totalCorrect: number,
    result?: number,
    type: number | string,   
    createdAt?: string,
    updatedAt?: string
}