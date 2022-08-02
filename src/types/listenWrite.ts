export type ListenWriteType = {
    _id?: string,
    area:string,
    category: string,
    content?: [
        {
            name:string,
            text:string,
            answer?: string
        } | any
    ],
    audio: any,
    timeLimit?: string,
    createdAt?: string,
    updatedAt?: string
}