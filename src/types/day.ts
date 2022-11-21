import { WeekType } from "./week"

export type DayType = {
    _id?: string,
    week?: WeekType,
    title?: string,
    order: number,
    status?:number,
    createdAt?: string,
    updatedAt?: string
}