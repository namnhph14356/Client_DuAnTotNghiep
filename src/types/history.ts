import { UserType } from "./user"

export type HistoryType = {
    _id?: string,
    user: string | UserType,
    category: string,
    totalPoint: number,
    type: number,
    createdAt?: string,
    updatedAt?: string
}