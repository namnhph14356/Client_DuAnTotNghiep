import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCategory, editCategory, getCategoryById, listCategory, removeCategory } from "../../../api/category";
import { CategoryType } from "../../../types/category";
// import { addCategory, editCategory, getCategoryById, listCategory, removeCategory } from "../../api/category";
// import { CategoryType } from "../../types";


export const getCategoryList:any = createAsyncThunk(
    "category/getCategories",
    async () => {
        const {data} = await listCategory();
        
        return data;
    }
)

export const addCategorySlide:any = createAsyncThunk(
    "category/addCategory",
    async (category:CategoryType) => {
        const {data} = await addCategory(category);
        
        return data;
    }
)

export const editdCategorySlide:any = createAsyncThunk(
    "category/editCategory",
    async (category:CategoryType) => {
        
        const {data} = await editCategory(category);
        console.log(data);
        
        return data;
    }
)

export const removeCate:any = createAsyncThunk(
    "category/deleteCategory",
    async (id:any) => {
        // console.log(id);       
        const {data} = await removeCategory(id);
        // console.log(data);
        
        return data;
    }
)
export const getCateById:any = createAsyncThunk(
    "category/getCateById",
    async (id:any) => {
        const {data} = await getCategoryById(id);

        // console.log(data);
        
        return data;
    }
)

const categorySlide = createSlice({
    name:"category",
    initialState:{
        value:[]
    },
    reducers:{

    },
    extraReducers:  (builer) => {
        builer.addCase(getCategoryList.fulfilled, (state, action) => {
            state.value = action.payload;
            console.log(state.value);
            
        })
        builer.addCase(addCategorySlide.fulfilled, (state:any, action:any) => {
            state.value.push(action.payload)
        })
        builer.addCase(editdCategorySlide.fulfilled, (state:any, action) => {
            console.log(state.value);
            state.value = state.value.map((item: { _id: any; }) => item._id === action.payload._id ? action.payload : item)
            console.log("edit state:"+ state.value);
            
        })
        
        builer.addCase(removeCate.fulfilled,  (state:any, action:any) => {
            state.value = state.value.filter((arrow:any) => arrow._id !== action.payload._id);   
        })

        builer.addCase(getCateById.fulfilled, (state:any, action:any) => {
           
            state.value = action.payload;   
            // console.log(action.payload);
            
        })

    },
    

})
export default categorySlide.reducer;