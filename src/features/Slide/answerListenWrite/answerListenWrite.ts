import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addAnswerListenWrite, editAnswerListenWrite, listAnswerListenWriteById, removeAnswerListenWrite } from '../../../api/answerListenWrite'
import { addAnswerQuiz, detailAnswerQuiz, editAnswerQuiz, listAnswerQuiz, removeAnswerQuiz } from '../../../api/answerQuiz'
import { AnswerQuizType } from '../../../types/answerQuiz'


export const getListAnswerListenWriteSlide = createAsyncThunk(
    'answerListenWrite/getListAnswerListenWriteSlide',
    async (id:string) => {
        const { data } = await listAnswerListenWriteById(id)
        return data
    }
)

export const addAnswerListenWriteSlide = createAsyncThunk(
    'answerListenWrite/addAnswerListenWriteSlide',
    async (answerListenWrite: any) => {
        const { data } = await addAnswerListenWrite(answerListenWrite)
        return data
    }
)

export const editAnswerListenWriteSlide = createAsyncThunk(
    'answerListenWrite/editAnswerListenWriteSlide',
    async (answerListenWrite: any) => {
        const { data } = await editAnswerListenWrite(answerListenWrite)
        return data
    }
)

export const removeAnswerListenWriteSlide = createAsyncThunk(
    'answerListenWrite/removeAnswerListenWriteSlide',
    async (arr: any) => {
        if (Array.isArray(arr)) {
            let dataRemove: AnswerQuizType[] = []
            for (let i = 0; i < arr.length; i++) {
                const { data } = await removeAnswerListenWrite(arr[i].id)
                dataRemove.push(data)
            }
            return dataRemove
        } else {
            const { data } = await removeAnswerListenWrite(arr)
            return data
        }
    }
)


const answerListenWriteSlide = createSlice({
    name: "answerListenWrite",
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
        builder.addCase(getListAnswerListenWriteSlide.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(addAnswerListenWriteSlide.fulfilled, (state: any, action) => {
            state.value = [...state.value, action.payload]
        })
        builder.addCase(editAnswerListenWriteSlide.fulfilled, (state: any, action) => {
            state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
        })
        builder.addCase(removeAnswerListenWriteSlide.fulfilled, (state: any, action) => {
            if (Array.isArray(action.payload)) {
                const payload = {
                    excludeIds: action.payload.map(item => {
                        return item._id
                    })
                }
                state.value = state.value.filter(item => !payload.excludeIds.includes(item._id))
            } else {
                state.value = state.value.filter(item => item._id !== action.payload._id)
            }
        })
    },

})

export const { changeBreadcrumb } = answerListenWriteSlide.actions

export default answerListenWriteSlide.reducer