import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addAnswerQuiz, detailAnswerQuiz, editAnswerQuiz, listAnswerQuiz, removeAnswerQuiz } from '../../../api/answerQuiz'
import { addQuestionListenWrite, editQuestionListenWrite, getListQuestionListenWriteById, removeQuestionListenWrite } from '../../../api/questionListenWrite'
import { AnswerQuizType } from '../../../types/answerQuiz'


// export const getQuestionListenWriteByIdSlice = createAsyncThunk(
//     'questionListenWrite/getQuestionListenWriteById',
//     async (id:string) => {
//         const { data } = await getListQuestionListenWriteById(id)
//         return data
//     }
// )

export const addQuestionListenSlide = createAsyncThunk(
    'questionListenWrite/addQuestionListenSlide',
    async (question: any) => {
        const { data } = await addQuestionListenWrite(question)
        return data
    }
)

export const editQuestionListenWriteSlide = createAsyncThunk(
    'questionListenWrite/editQuestionListenWriteSlide',
    async (answerQuiz: any) => {
        const { data } = await editQuestionListenWrite(answerQuiz)
        return data
    }
)

export const removeQuestionListenSlide = createAsyncThunk(
    'questionListenWrite/removeQuestionListenSlide',
    async (arr: any) => {
        if (Array.isArray(arr)) {
            let dataRemove: AnswerQuizType[] = []
            for (let i = 0; i < arr.length; i++) {
                const { data } = await removeQuestionListenWrite(arr[i].id)
                dataRemove.push(data)
            }
            return dataRemove
        } else {
            const { data } = await removeQuestionListenWrite(arr)
            return data
        }
    }
)


const questionListenWrite = createSlice({
    name: "questionListenWrite",
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
        // builder.addCase(getQuestionListenWriteByIdSlice.fulfilled, (state, action) => {
        //     state.value = action.payload
        // })
        builder.addCase(addQuestionListenSlide.fulfilled, (state: any, action) => {
            state.value = [...state.value, action.payload]
        })
        builder.addCase(editQuestionListenWriteSlide.fulfilled, (state: any, action) => {
            state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
        })
        builder.addCase(removeQuestionListenSlide.fulfilled, (state: any, action) => {
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

export const { changeBreadcrumb } = questionListenWrite.actions

export default questionListenWrite.reducer