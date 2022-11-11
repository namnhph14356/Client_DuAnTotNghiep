import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDay, editDay, listDay, listDayByWeek, removeDay, dayBiggest } from "../../../api/day";
import { DayType } from "../../../types/day";


export const getListDaySlice = createAsyncThunk(
     'days/getListDay',
     async () => {
          const { data } = await listDay()
          return data
     }
)

export const getListDaySliceByWeek = createAsyncThunk(
     'days/getListDayByWeek',
     async (id: any) => {
          const { data } = await listDayByWeek(id)
          return data
     }
)

export const addDaySlice = createAsyncThunk(
     'days/addDay',
     async (day: DayType) => {
          const { data } = await addDay(day)
          return data
     }
)

export const editDaySlice = createAsyncThunk(
     'days/editDay',
     async (day: DayType) => {
          const { data } = await editDay(day)
          return data
     }
)

export const removeDaySlice = createAsyncThunk(
     'days/removeDay',
     async (arr: any) => {
          if (Array.isArray(arr)) {

               let dataRemove: DayType[] = []
               for (let i = 0; i < arr.length; i++) {
                    const { data } = await removeDay(arr[i].id)
                    dataRemove.push(data)
               }
               return dataRemove
          } else {
               const { data } = await removeDay(arr)
               return data
          }
     }
)

export const getDayBiggest = createAsyncThunk(
     "days/dayBiggest",
     async () => {
          const {data} = await dayBiggest();
          // console.log("slice",data);
          return data
          
     }
)

const daySlice = createSlice({
     
     name: "Days",
     initialState: {
          value: [],
          valueByWeek: [],
          breadcrumb: "",
          bigDay:[]
     },
     reducers: {
          changeBreadcrumb(state, action) {
               state.breadcrumb = action.payload
          }
     },
     extraReducers(builder) {
          
          builder.addCase(getListDaySlice.fulfilled, (state, action) => {
               state.value = action.payload

          })
          builder.addCase(getDayBiggest.fulfilled, (state, action) => {
               state.bigDay = action.payload

          })
          builder.addCase(getListDaySliceByWeek.fulfilled, (state, action) => {
               state.valueByWeek = action.payload

          })
          builder.addCase(addDaySlice.fulfilled, (state: any, action) => {
               state.value = [...state.value, action.payload]
               
          })
          builder.addCase(editDaySlice.fulfilled, (state: any, action) => {
               state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
               
          })
          builder.addCase(removeDaySlice.fulfilled, (state: any, action: any) => {
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

export const { changeBreadcrumb } = daySlice.actions

export default daySlice.reducer