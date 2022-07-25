export type CategoryType = {
    _id?: string ,
    title: string, 
    detail: string,
    image: string,
    
}

export type UserType = {
    confirmPassword(confirmPassword: any)
    _id?: number,
    username?: String,
    email: String,
    password?: string | number,
    phone?:string,
    address?:string,
    img?:string,
    role?: string,
    sex?:number
}