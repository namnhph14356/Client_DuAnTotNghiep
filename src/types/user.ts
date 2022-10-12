export interface UserType {
    _id?: string,
    username: string,
    email: string,
    password?: string,
    phone?: number,
    address?: string,
    img?: string,
    sex?: number,
    role?: string , // chuyển thành number (toDo)
    colorImage?:string,
    idFacebook?: string,
    idGoogle?: string
    createdAt?: "2022-07-08T15:56:49.062Z",
    updatedAt?: "2022-07-08T16:55:45.851Z",
}