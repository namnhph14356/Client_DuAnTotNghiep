import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addUserListenWrite, listUserListenWriteByIdListenWrite } from '../../../api/userListenWrite'
import { addUserQuiz, editUserQuiz, listUserQuiz, removeUserQuiz } from '../../../api/userQuiz'
import {  UserListenWriteType } from '../../../types/userListenWrite'
import { UserQuizType } from '../../../types/userQuiz'



export const getListUserListenAndWriteByIdListenWrite:any = createAsyncThunk(
    "userListenWrite/getListUserListenAndWriteByIdListenWrite",
    async (id:string) => {
        const { data } = await listUserListenWriteByIdListenWrite(id)
        return data
    }
)

export const addUserListenAndWrite:any = createAsyncThunk(
    "userListenWrite/addUserListenAndWrite",
    async (userListenWrite: UserListenWriteType) => {
        const { data } = await addUserListenWrite(userListenWrite)
        return data
    }
)

// export const editUserQuizSlide = createAsyncThunk(
//     "userListenWrite/editUserQuiz",
//     async (userListenWrite: UserListenWriteType) => {
//         // const { data } = await editUserQuiz(userListenWrite)
//         // return data
//     }
// )

// export const removeUserQuizSlide = createAsyncThunk(
//     "userListenWrite/removeUserQuiz",
//     // async (id: string) => {
//     //     const { data } = await removeUserQuiz(id)
//     //     return data
//     // }

//     async (arr: any) => {
//         if (Array.isArray(arr)) {
//             console.log("arr > 0", arr);

//             let dataRemove: UserQuizType[] = []
//             for (let i = 0; i < arr.length; i++) {
//                 const { data } = await removeUserQuiz(arr[i].id)
//                 dataRemove.push(data)
//             }
//             console.log("dataRemove", dataRemove);
//             return dataRemove
//         } else {
//             console.log("arr", arr);


//             const { data } = await removeUserQuiz(arr)
//             return data

//         }
//     }
// )

const UserListenWriteSlice = createSlice({
    name: "userListenWrite",
    initialState: {
        value: [],
        breadcrumb: ""
    },
    reducers: {
        changeBreadcrumb(state, action) {
            state.breadcrumb = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(addUserListenAndWrite.fulfilled, (state: any, action) => {
            state.value = [...state.value, action.payload]
    
        })
        builder.addCase(getListUserListenAndWriteByIdListenWrite.fulfilled, (state, action) => {
            state.value = action.payload
        })
        // builder.addCase(editUserQuizSlide.fulfilled, (state: any, action) => {
        //     state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
        // })
        // builder.addCase(removeUserQuizSlide.fulfilled, (state: any, action) => {
        //     console.log("action.payload._id", action.payload);
        //     if (Array.isArray(action.payload)) {
        //         const payload = {
        //             excludeIds: action.payload.map(item => {
        //                 return item._id
        //             })
        //         }
        //         console.log("payload", payload);
        //         state.value = state.value.filter(item => !payload.excludeIds.includes(item._id))
        //         console.log("state.value", state.value);
        //     } else {
        //         state.value = state.value.filter(item => item._id !== action.payload._id)
        //     }
        // })
    },
})


export default UserListenWriteSlice.reducer