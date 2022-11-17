export type PracticeActivityType = {
    _id?: string,
    day: string,
    title: string,
    type: string,
    order: number,
    status?:boolean,
    createdAt?: string,
    updatedAt?: string
}