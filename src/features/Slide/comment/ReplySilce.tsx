import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addComment, editComment, listComment, removeComment, updateLike } from "../../../api/comment";
import { addReplyComment, editReplyComment, getReplyCommentById, listReplyComment, removeReplyComment } from "../../../api/replycomment";
import { CommentType } from "../../../types/comment";
import { ReplyCommentType } from "../../../types/replycomment";


export const getReplyCommentList:any = createAsyncThunk(
    "replycomment/getReplyComment",
    async () => {
        const {data} = await listReplyComment();
        
        return data;
    }
)

export const addReplyCommentSlide:any = createAsyncThunk(
    "replycomment/addReplyComment",
    async (Comment:ReplyCommentType) => {
        const {data} = await addReplyComment(Comment);
        
        return data;
    }
)

export const editdReplyCommentSlide:any = createAsyncThunk(
    "replycomment/editReplyComment",
    async (Comment:ReplyCommentType) => {
        
        const {data} = await editReplyComment(Comment);
        console.log(data);
        
        return data;
    }
)

export const removeReplyCommentSlice:any = createAsyncThunk(
    "replycomment/deleteReplyComment",
    async (id:any) => {
        // console.log(id);       
        const {data} = await removeReplyComment(id);
        // console.log(data);
        
        return data;
    }
)
export const getReplyCommentByIdSlice:any = createAsyncThunk(
    "replycomment/getReplyCommentById",
    async (id:any) => {
        const {data} = await getReplyCommentById(id);

        // console.log(data);
        
        return data;
    }
)

const ReplycommentSlide = createSlice({
    name:"replycomment",
    initialState:{
        value:[]
    },
    reducers:{

    },
    extraReducers:  (builer) => {
        builer.addCase(getReplyCommentList.fulfilled, (state, action) => {
            state.value = action.payload;
            console.log(state.value);
            
        })
        builer.addCase(addReplyCommentSlide.fulfilled, (state:any, action:any) => {
            state.value.push(action.payload)
        })
        builer.addCase(editdReplyCommentSlide.fulfilled, (state:any, action) => {
            console.log(state.value);
            state.value = state.value.map((item: { _id: any; }) => item._id === action.payload._id ? action.payload : item)
            console.log("edit state:"+ state.value);
            
        })
    
        builer.addCase(removeReplyCommentSlice.fulfilled,  (state:any, action:any) => {
            state.value = state.value.filter((arrow:any) => arrow._id !== action.payload._id);   
        })

        builer.addCase(getReplyCommentByIdSlice.fulfilled, (state:any, action:any) => {
           
            state.value = action.payload;   
            // console.log(action.payload);
            
        })

    },
    

})
export default ReplycommentSlide.reducer;