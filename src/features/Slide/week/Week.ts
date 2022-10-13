import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addWeek, editWeek, listWeek, removeWeek } from "../../../api/week";
import { WeekType } from "../../../types/week";






export const getListWeekSlice = createAsyncThunk(
     'weeks/getListWeek',
     async () => {
          const { data } = await listWeek()
          return data
     }
)

export const addWeekSlice = createAsyncThunk(
     'weeks/addWeek',
     async (week: WeekType) => {
          const { data } = await addWeek(week)
          return data
     }
)

export const editWeekSlice = createAsyncThunk(
     'weeks/editWeek',
     async (week: WeekType) => {
          const { data } = await editWeek(week)
          return data
     }
)

export const removeWeekSlice = createAsyncThunk(
     'weeks/removeWeek',
     async (arr: any) => {
          if (Array.isArray(arr)) {

               let dataRemove: WeekType[] = []
               for (let i = 0; i < arr.length; i++) {
                    const { data } = await removeWeek(arr[i].id)
                    dataRemove.push(data)
               }
               return dataRemove
          } else {
               const { data } = await removeWeek(arr)
               return data
          }
     }
)



const weekSlice = createSlice({
     
     name: "Weeks",
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
          
          builder.addCase(getListWeekSlice.fulfilled, (state, action) => {
               state.value = action.payload

          })
          builder.addCase(addWeekSlice.fulfilled, (state: any, action) => {
               state.value = [...state.value, action.payload]
               
          })
          builder.addCase(editWeekSlice.fulfilled, (state: any, action) => {
               state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
               
          })
          builder.addCase(removeWeekSlice.fulfilled, (state: any, action: any) => {
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

export const { changeBreadcrumb } = weekSlice.actions

export default weekSlice.reducer