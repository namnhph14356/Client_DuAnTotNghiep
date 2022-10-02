import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addAnswerQuiz, detailAnswerQuiz, editAnswerQuiz, listAnswerQuiz, removeAnswerQuiz } from '../../../api/answerQuiz'
import { AnswerQuizType } from '../../../types/answerQuiz'


export const getListAnswerQuizSlide = createAsyncThunk(
    'answerQuiz/getListAnswerQuiz',
    async () => {
        const { data } = await listAnswerQuiz()
        return data
    }
)

export const addAnswerQuizSlide = createAsyncThunk(
    'answerQuiz/addAnswerQuiz',
    async (answerQuiz: AnswerQuizType) => {
        const { data } = await addAnswerQuiz(answerQuiz)
        return data
    }
)

export const editAnswerQuizSlide = createAsyncThunk(
    'answerQuiz/editAnswerQuiz',
    async (answerQuiz: AnswerQuizType) => {
        const { data } = await editAnswerQuiz(answerQuiz)
        return data
    }
)

export const removeAnswerQuizSlide = createAsyncThunk(
    'answerQuiz/removeAnswerQuiz',
    async (arr: any) => {
        if (Array.isArray(arr)) {
            let dataRemove: AnswerQuizType[] = []
            for (let i = 0; i < arr.length; i++) {
                const { data } = await removeAnswerQuiz(arr[i].id)
                dataRemove.push(data)
            }
            return dataRemove
        } else {
            const { data } = await removeAnswerQuiz(arr)
            return data
        }
    }
)


const answerQuizSlide = createSlice({
    name: "answerQuizs",
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
        builder.addCase(getListAnswerQuizSlide.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(addAnswerQuizSlide.fulfilled, (state: any, action) => {
            state.value = [...state.value, action.payload]
        })
        builder.addCase(editAnswerQuizSlide.fulfilled, (state: any, action) => {
            state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
        })
        builder.addCase(removeAnswerQuizSlide.fulfilled, (state: any, action) => {
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

export const { changeBreadcrumb } = answerQuizSlide.actions

export default answerQuizSlide.reducer