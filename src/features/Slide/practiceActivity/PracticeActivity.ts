import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPracticeActivity, editPracticeActivity, listPracticeActivity, removePracticeActivity } from "../../../api/practiceActivity";
import { PracticeActivityType } from "../../../types/practiceActivity";






export const getListPracticeActivitylice = createAsyncThunk(
     'practiceActivities/getListPracticeActivity',
     async () => {
          const { data } = await listPracticeActivity()
          return data
     }
)

export const addPracticeActivitylice = createAsyncThunk(
     'practiceActivities/addPracticeActivity',
     async (practiceActivitie: PracticeActivityType) => {
          const { data } = await addPracticeActivity(practiceActivitie)
          return data
     }
)

export const editPracticeActivitylice = createAsyncThunk(
     'practiceActivities/editPracticeActivity',
     async (practiceActivitie: PracticeActivityType) => {
          const { data } = await editPracticeActivity(practiceActivitie)
          return data
     }
)

export const removePracticeActivitylice = createAsyncThunk(
     'practiceActivities/removePracticeActivity',
     async (arr: any) => {
          if (Array.isArray(arr)) {

               let dataRemove: PracticeActivityType[] = []
               for (let i = 0; i < arr.length; i++) {
                    const { data } = await removePracticeActivity(arr[i].id)
                    dataRemove.push(data)
               }
               return dataRemove
          } else {
               const { data } = await removePracticeActivity(arr)
               return data
          }
     }
)



const practiceActivitySlice = createSlice({
     
     name: "PracticeActivity",
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
          
          builder.addCase(getListPracticeActivitylice.fulfilled, (state, action) => {
               state.value = action.payload

          })
          builder.addCase(addPracticeActivitylice.fulfilled, (state: any, action) => {
               state.value = [...state.value, action.payload]
               
          })
          builder.addCase(editPracticeActivitylice.fulfilled, (state: any, action) => {
               state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
               
          })
          builder.addCase(removePracticeActivitylice.fulfilled, (state: any, action: any) => {
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

export const { changeBreadcrumb } = practiceActivitySlice.actions

export default practiceActivitySlice.reducer