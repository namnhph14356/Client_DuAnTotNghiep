import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addUserQuiz, editUserQuiz, listUserQuiz, removeUserQuiz } from '../../../api/userQuiz'
import { UserQuizType } from '../../../types/userQuiz'



export const getListUserQuizSlide = createAsyncThunk(
    "userQuiz/getListUserQuiz",
    async () => {
        const { data } = await listUserQuiz()
        return data
    }
)

export const addUserQuizSlide = createAsyncThunk(
    "userQuiz/addUserQuiz",
    async (userQuiz: UserQuizType) => {
        const { data } = await addUserQuiz(userQuiz)
        return data
    }
)

export const editUserQuizSlide = createAsyncThunk(
    "userQuiz/editUserQuiz",
    async (userQuiz: UserQuizType) => {
        const { data } = await editUserQuiz(userQuiz)
        return data
    }
)

export const removeUserQuizSlide = createAsyncThunk(
    "userQuiz/removeUserQuiz",
    // async (id: string) => {
    //     const { data } = await removeUserQuiz(id)
    //     return data
    // }

    async (arr: any) => {
        if (Array.isArray(arr)) {
            console.log("arr > 0", arr);

            let dataRemove: UserQuizType[] = []
            for (let i = 0; i < arr.length; i++) {
                const { data } = await removeUserQuiz(arr[i].id)
                dataRemove.push(data)
            }
            console.log("dataRemove", dataRemove);
            return dataRemove
        } else {
            console.log("arr", arr);


            const { data } = await removeUserQuiz(arr)
            return data

        }
    }
)

const userQuizSlide = createSlice({
    name: "userQuizs",
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
        builder.addCase(getListUserQuizSlide.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(addUserQuizSlide.fulfilled, (state: any, action) => {
            state.value = [...state.value, action.payload]

        })
        builder.addCase(editUserQuizSlide.fulfilled, (state: any, action) => {
            state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
        })
        builder.addCase(removeUserQuizSlide.fulfilled, (state: any, action) => {
            console.log("action.payload._id", action.payload);
            if (Array.isArray(action.payload)) {
                const payload = {
                    excludeIds: action.payload.map(item => {
                        return item._id
                    })
                }
                console.log("payload", payload);
                state.value = state.value.filter(item => !payload.excludeIds.includes(item._id))
                console.log("state.value", state.value);
            } else {
                state.value = state.value.filter(item => item._id !== action.payload._id)
            }
        })
    },
})

export const { changeBreadcrumb } = userQuizSlide.actions

export default userQuizSlide.reducer