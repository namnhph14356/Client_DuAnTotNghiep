import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMonth, editMonth, listMonth, removeMonth } from "../../../api/month";
import { MonthType } from "../../../types/month";





export const getListMonthSlice = createAsyncThunk(
     'months/getListMonth',
     async () => {
          const { data } = await listMonth()
          return data
     }
)

export const addMonthSlice = createAsyncThunk(
     'months/addMonth',
     async (month: MonthType) => {
          const { data } = await addMonth(month)
          return data
     }
)

export const editMonthSlice = createAsyncThunk(
     'months/editMonth',
     async (month: MonthType) => {
          const { data } = await editMonth(month)
          return data
     }
)

export const removeMonthSlice = createAsyncThunk(
     'months/removeMonth',
     async (arr: any) => {
          if (Array.isArray(arr)) {

               let dataRemove: MonthType[] = []
               for (let i = 0; i < arr.length; i++) {
                    const { data } = await removeMonth(arr[i].id)
                    dataRemove.push(data)
               }
               return dataRemove
          } else {
               const { data } = await removeMonth(arr)
               return data
          }
     }
)



const monthSlice = createSlice({
     
     name: "Months",
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
          
          builder.addCase(getListMonthSlice.fulfilled, (state, action) => {
               state.value = action.payload

          })
          builder.addCase(addMonthSlice.fulfilled, (state: any, action) => {
               state.value = [...state.value, action.payload]
               
          })
          builder.addCase(editMonthSlice.fulfilled, (state: any, action) => {
               state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
               
          })
          builder.addCase(removeMonthSlice.fulfilled, (state: any, action: any) => {
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

export const { changeBreadcrumb } = monthSlice.actions

export default monthSlice.reducer