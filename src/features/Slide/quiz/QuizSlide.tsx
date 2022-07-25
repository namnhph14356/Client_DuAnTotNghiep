import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addQuiz, detailQuiz, editQuiz, listQuiz, removeQuiz } from "../../../api/quiz";
import { QuizType } from "../../../types/quiz";


export const getListQuizSlide = createAsyncThunk(
     'quizs/getListQuiz',
     async () => {
          const { data } = await listQuiz()
          return data
     }
)

export const addQuizSlide = createAsyncThunk(
     'quizs/addQuiz',
     async (quiz: QuizType) => {
          const { data } = await addQuiz(quiz)
          return data
     }
)

export const editQuizSlide = createAsyncThunk(
     'quizs/editQuiz',
     async (quiz: QuizType) => {
          const { data } = await editQuiz(quiz)
          return data
     }
)

export const removeQuizSlide = createAsyncThunk(
     'quizs/removeQuiz',
     // async (id: any) => {
     //      const { data } = await removeQuiz(id)
     //      return data
     // }

     async (arr: any) => {
          if (Array.isArray(arr)) {
               console.log("arr > 0", arr);

               let dataRemove: QuizType[] = []
               for (let i = 0; i < arr.length; i++) {
                    const { data } = await removeQuiz(arr[i].id)
                    dataRemove.push(data)
               }
               console.log("dataRemove", dataRemove);
               return dataRemove
          } else {
               console.log("arr", arr);

               const { data } = await removeQuiz(arr)
               return data
          }
     }
)

const quizSlice = createSlice({
     name: "quizs",
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
          builder.addCase(getListQuizSlide.fulfilled, (state, action) => {
               state.value = action.payload

          })
          builder.addCase(addQuizSlide.fulfilled, (state: any, action) => {
               state.value = [...state.value, action.payload]

          })
          builder.addCase(editQuizSlide.fulfilled, (state: any, action) => {
               state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)

          })
          builder.addCase(removeQuizSlide.fulfilled, (state: any, action: any) => {
               // state.value = state.value.filter(item => item._id !== action.payload._id)
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

export const { changeBreadcrumb } = quizSlice.actions

export default quizSlice.reducer