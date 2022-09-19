import { UserListenWriteType } from "../types/userListenWrite";
import { UserQuizType } from "../types/userQuiz";
import instance from "./instance";  


export const addUserListenWrite = async (data: UserListenWriteType) => {
    const url = `/userListenWrite`
    return instance.post(url,data)
}
export const listUserListenWriteByIdListenWrite = async (id:string) => {
    const url = `/userListenWrite/${id}`
    return instance.get(url)
}

// export const detailUserQuiz = async (id: string) => {
//     const url = `/userQuiz/${id}`
//     return instance.get(url)
// }


// export const editUserQuiz = async (data: UserQuizType) => {
//     const url = `/userQuiz/${data._id}`
//     return instance.put(url,data)
// }

// export const removeUserQuiz = async (id: string) => {
//     const url = `/userQuiz${id}`
//     return instance.delete(url)
// }