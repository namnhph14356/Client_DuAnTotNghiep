export interface UserType {
    _id?: string,
    username: string,
    email: string,
    password?: string,
    phone?: number,
    address?: string,
    img?: string,
    sex?: number,
    role?: string ,
    colorImage?:string,
    idFacebook?: string,
    idGoogle?: string
    createdAt?: string,
    updatedAt?: string,
}