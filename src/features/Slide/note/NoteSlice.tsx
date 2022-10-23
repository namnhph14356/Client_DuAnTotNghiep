import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { editUserNote, getUserNote, userAddNote } from "../../../api/noteCouse";
import { NoteCouseType } from "../../../types/noteCouse";


export const getNoteUser:any = createAsyncThunk(
    "noteCouse/getUserNote",
    async (req:any) => {
        const {data} = await getUserNote(req?.dayId, req?.id);
        // getData()
        return data;
    }
)

export const addNote:any = createAsyncThunk(
    "noteCouse/userAddNote",
    async (note:NoteCouseType) => {
        try {
            const {data} = await userAddNote(note);
            return data;   
        } catch (error) {
            message.error("Lỗi");
        }
    }
)

export const editNote:any = createAsyncThunk(
    "noteCouse/editUserNote",
    async (note:NoteCouseType) => {
        try {
            const {data} = await editUserNote(note);
             return data;
        } catch (error) {
            message.error("Lỗi");
        }
       
       
    }
)

export const initialStateValue = [];


const noteSlide = createSlice({
    name:"noteCouse",
    initialState:{
        value:{}
    },
    reducers:{
        getData: (state, action) => {
            state.value = action.payload;    
          },
    },
    extraReducers:  (builer) => {
        builer.addCase(getNoteUser.fulfilled, (state:any, action:any) => {
            state.value = action.payload;
        })
        builer.addCase(addNote.fulfilled, (state:any, action:any) => {
            state.value = action.payload;

        })
        builer.addCase(editNote.fulfilled, (state:any, action) => {
            state.value = action.payload;
            
        })
    

    },
    

})
export const { getData } = noteSlide.actions;
export default noteSlide.reducer;