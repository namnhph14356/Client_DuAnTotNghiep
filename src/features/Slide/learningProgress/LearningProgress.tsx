import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addLearningProgress, detailLearningProgressByUser, editLearningProgress, listLearningProgressByUser } from "../../../api/learningProgress";
import { LearningProgressType, AddLearningProgressType } from "../../../types/learningProgress";




export const getLearningProgressByUserSlice = createAsyncThunk(
     'learningProgress/getLearningProgressByUser',
     async (userId: string | undefined) => {
          const { data } = await listLearningProgressByUser(userId);
          return data
     }
)

export const addLearningProgressSlice = createAsyncThunk(
     'learningProgress/addLearningProgress',
     async ({day,user}: AddLearningProgressType) => {
          const { data } = await addLearningProgress({day,user})
          return data
     }
)

export const editLearningProgressSlice = createAsyncThunk(
     'learningProgress/editLearningProgress',
     async (learningProgress: LearningProgressType) => {
          const { data } = await editLearningProgress(learningProgress)
          return data
     }
)



const learningProgressSlice = createSlice({
     name: "learningProgress",
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
          builder.addCase(getLearningProgressByUserSlice.fulfilled, (state: any, action) => {
               state.value = action.payload
          })
          builder.addCase(addLearningProgressSlice.fulfilled, (state: any, action) => {
               state.value = [...state.value, action.payload]

          })
          builder.addCase(editLearningProgressSlice.fulfilled, (state: any, action) => {
               state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)

          })
     }
})
export const { changeBreadcrumb } = learningProgressSlice.actions
export default learningProgressSlice.reducer