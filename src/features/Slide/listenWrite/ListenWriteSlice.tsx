import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { start } from "repl";
import { addListenWrite, detailListenWrite, detailListenWriteByIdCategory, editListenWrite, listListenWrite, removeListenWrite } from "../../../api/listenWrite";
import { ListenWriteType } from "../../../types/listenWrite";



export const getListListenWrite = createAsyncThunk(
     'listenWrite/getListListenWrite',
     async () => {
          const { data } = await listListenWrite();
          return data
     }
)

export const getListenWriteById = createAsyncThunk(
     'listenWrite/getListenWriteById',
     async (id: string) => {
          const { data } = await detailListenWrite(id);
          return data
     }
)

export const getListenWriteByIdCategory:any = createAsyncThunk(
     'listenWrite/getListenWriteByIdCategory',
     async (id: string) => {
          const { data } = await detailListenWriteByIdCategory(id);
          return data
     }
)

export const addListen = createAsyncThunk(
     'listenWrite/addListenWrite',
     async (listenWrite: ListenWriteType) => {
          const { data } = await addListenWrite(listenWrite)
          return data
     }
)

export const editListen = createAsyncThunk(
     'listenWrite/editListenWrite',
     async (listenWrite: ListenWriteType) => {
          const { data } = await editListenWrite(listenWrite)
          return data
     }
)

export const removeListenSlide = createAsyncThunk(
     'listenWrite/removeListenWrite',
     async (arr: any) => {
          if (Array.isArray(arr)) {

               let dataRemove: ListenWriteType[] = []
               for (let i = 0; i < arr.length; i++) {
                    const { data } = await removeListenWrite(arr[i].id)
                    dataRemove.push(data)
               }
               return dataRemove
          } else {

               const { data } = await removeListenWrite(arr)
               return data
          }
     }
)

const listenWriteSlice = createSlice({
     name: "listenWrite",
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
          builder.addCase(getListListenWrite.fulfilled, (state: any, action) => {
               state.value = action.payload
          })
          builder.addCase(getListenWriteById.fulfilled, (state: any, action) => {
               state.value = action.payload
          })
          builder.addCase(getListenWriteByIdCategory.fulfilled, (state: any, action) => {
               state.value = action.payload
          })
          
          builder.addCase(addListen.fulfilled, (state: any, action) => {
               state.value = [...state.value, action.payload]

          })
          builder.addCase(editListen.fulfilled, (state: any, action) => {
               state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)

          })
          builder.addCase(removeListenSlide.fulfilled, (state: any, action: any) => {
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
     }
})
export const { changeBreadcrumb } = listenWriteSlice.actions
export default listenWriteSlice.reducer