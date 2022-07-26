import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addHistory, editHistory, listHistory, removeHistory } from '../../../api/history'
import { HistoryType } from '../../../types/history'


export const getListHistorySlide = createAsyncThunk(
    "history/getListHistory",
   async () => {
    const {data} = await listHistory()
    return data
   }
)

export const addHistorySlide = createAsyncThunk(
    "history/addHistory",
   async (history: HistoryType ) => {
    const {data} = await addHistory(history)
    return data
   }
)

export const editHistorySlide = createAsyncThunk(
    "history/editHistory",
   async (history: HistoryType ) => {
    const {data} = await editHistory(history)
    return data
   }
)

export const removeHistorySlide = createAsyncThunk(
    "history/removeHistory",
   async (id: string) => {
    const {data} = await removeHistory(id)
    return data
   }
)

const historySlide = createSlice({
    name: "history",
    initialState:{
        value: [],
        breadcrumb: ""
    },
    reducers:{
        changeBreadcrumb(state, action){
            state.value = action.payload
        }
    
    },
    extraReducers(builder) {
        builder.addCase(getListHistorySlide.fulfilled,(state, action)=>{
            state.value = action.payload
        })
        builder.addCase(addHistorySlide.fulfilled,(state: any, action)=>{
            state.value = [...state.value,action.payload]
        })
        builder.addCase(editHistorySlide.fulfilled,(state: any, action)=>{
            state.value = state.value.map(item => item._id === action.payload._id? action.payload : item)
        })
        builder.addCase(removeHistorySlide.fulfilled,(state: any, action)=>{
            state.value = state.value.filter(item => item._id !== action.payload._id)
        })
    },
    
})

export const { changeBreadcrumb } = historySlide.actions

export default historySlide.reducer
