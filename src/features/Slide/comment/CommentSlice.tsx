import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addComment, editComment, listComment, removeComment, updateLike } from "../../../api/comment";
import { CommentType } from "../../../types/comment";


export const getCommentList:any = createAsyncThunk(
    "comment/getComment",
    async () => {
        const {data} = await listComment();
        
        return data;
    }
)

export const addCommentSlide:any = createAsyncThunk(
    "comment/addComment",
    async (Comment:CommentType) => {
        const {data} = await addComment(Comment);
        
        return data;
    }
)

export const editdCommentSlide:any = createAsyncThunk(
    "comment/editComment",
    async (Comment:CommentType) => {
        
        const {data} = await editComment(Comment);
        console.log(data);
        
        return data;
    }
)
export const updateLikeSlice:any = createAsyncThunk(
    "comment/updateLike",
    async (Comment:CommentType) => {
        
        const {data} = await updateLike(Comment);
        console.log(data);
        
        return data;
    }
)

export const removeCommentSlice:any = createAsyncThunk(
    "comment/deleteComment",
    async (id:any) => {
        // console.log(id);       
        const {data} = await removeComment(id);
        // console.log(data);
        
        return data;
    }
)
export const getCommentByIdSlice:any = createAsyncThunk(
    "comment/getCommentById",
    async (id:any) => {
        const {data} = await getCommentByIdSlice(id);

        // console.log(data);
        
        return data;
    }
)

const commentSlide = createSlice({
    name:"comment",
    initialState:{
        value:[]
    },
    reducers:{

    },
    extraReducers:  (builer) => {
        builer.addCase(getCommentList.fulfilled, (state, action) => {
            state.value = action.payload;
            console.log(state.value);
            
        })
        builer.addCase(addCommentSlide.fulfilled, (state:any, action:any) => {
            state.value.push(action.payload)
        })
        builer.addCase(editdCommentSlide.fulfilled, (state:any, action) => {
            console.log(state.value);
            state.value = state.value.map((item: { _id: any; }) => item._id === action.payload._id ? action.payload : item)
            console.log("edit state:"+ state.value);
            
        })
        builer.addCase(updateLikeSlice.fulfilled, (state:any, action) => {
            console.log(state.value);
            state.value = state.value.map((item: { _id: any; }) => item._id === action.payload._id ? action.payload : item)
            console.log("edit state:"+ state.value);
            
        })
        
        builer.addCase(removeCommentSlice.fulfilled,  (state:any, action:any) => {
            state.value = state.value.filter((arrow:any) => arrow._id !== action.payload._id);   
        })

        builer.addCase(getCommentByIdSlice.fulfilled, (state:any, action:any) => {
           
            state.value = action.payload;   
            // console.log(action.payload);
            
        })

    },
    

})
export default commentSlide.reducer;