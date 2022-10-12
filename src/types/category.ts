export type CategoryType = {
    _id?: string ,
    title: string, 
    detail: string,
    image: string,
    updatedAt?: Date,
    createdAt?: Date
}
// export type DetailCategoryType = {
//     category: CategoryType,
//     listenWrite: Lis
    
// }

export type UserType = {
    confirmPassword(confirmPassword: any)
    _id?: string | number,
    username?: String,
    email: String,
    password?: string | number,
    phone?:string,
    address?:string,
    img?:string,
    role?: string,
    sex?:number,
    updatedAt?: string,
    createdAt?: string
}