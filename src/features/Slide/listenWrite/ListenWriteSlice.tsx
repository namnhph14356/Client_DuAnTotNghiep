import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { start } from "repl";
import { addListenWrite, editListenWrite, listListenWrite, removeListenWrite } from "../../../api/listenWrite";
import { ListenWriteType } from "../../../types/listenWrite";

export const getListListenWrite = createAsyncThunk(
    'listenWrite/getListListenWrite',
    async () => {
        const {data} = await listListenWrite();
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
    'quizs/removeListenWrite',
    // async (id: any) => {
    //      const { data } = await removeQuiz(id)
    //      return data
    // }

    async (arr: any) => {
         if (Array.isArray(arr)) {
              console.log("arr > 0", arr);

              let dataRemove: ListenWriteType[] = []
              for (let i = 0; i < arr.length; i++) {
                   const { data } = await removeListenWrite(arr[i].id)
                   dataRemove.push(data)
              }
              console.log("dataRemove", dataRemove);
              return dataRemove
         } else {
              console.log("arr", arr);

              const { data } = await removeListenWrite(arr)
              return data
         }
    }
)

const listenWriteSlice = createSlice({
    name:"listenWrite",
    initialState:{
        value:[],
        breadcrumb: ""
    },
    reducers:{
        changeBreadcrumb(state, action) {
            state.breadcrumb = action.payload
       }
    },
    extraReducers(builder){
        builder.addCase(getListListenWrite.fulfilled, (state:any, action) =>{
            state.value = action.payload
        })
        builder.addCase(addListen.fulfilled, (state: any, action) => {
            state.value = [...state.value, action.payload]

       })
       builder.addCase(editListen.fulfilled, (state: any, action) => {
            state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)

       })
       builder.addCase(removeListenSlide.fulfilled, (state: any, action: any) => {
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
    }
})

export default listenWriteSlice.reducer