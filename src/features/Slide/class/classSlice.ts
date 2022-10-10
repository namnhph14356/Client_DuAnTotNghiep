import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCategory, editCategory, getCategoryById, listCategory, removeCategory } from "../../../api/category";
import { addClass, listClass } from "../../../api/class";
import { ClassType } from "../../../types/Class";
// import { addCategory, editCategory, getCategoryById, listCategory, removeCategory } from "../../api/category";
// import { CategoryType } from "../../types";


export const getListClass:any = createAsyncThunk(
    "class/getListClass",
    async () => {
        const {data} = await listClass();
        return data;
    }
)

export const createClass:any = createAsyncThunk(
    "class/createClass",
    async (classAdd : ClassType) => {
        const {data} = await addClass(classAdd);
        return data;
    }
)

export const editdCategorySlide:any = createAsyncThunk(
    "category/editCategory",
    async (category:CategoryType) => {
        const {data} = await editCategory(category);
        return data;
    }
)

export const removeCate:any = createAsyncThunk(
    "category/deleteCategory",
    async (id:any) => {
        const {data} = await removeCategory(id);
        return data;
    }
)
export const getCateById:any = createAsyncThunk(
    "category/getCateById",
    async (id:any) => {
        const {data} = await getCategoryById(id);
        return data;
    }
)

const categorySlide = createSlice({
    name:"category",
    initialState:{
        value:[],
        breadcrumb: ""
    },
    reducers:{
        changeBreadcrumb(state, action) {
            state.breadcrumb = action.payload
       }
    },
    extraReducers:  (builer) => {
        builer.addCase(getCategoryList.fulfilled, (state, action) => {
            state.value = action.payload;
        })
        builer.addCase(addClass.fulfilled, (state:any, action:any) => {
            state.value = [...state.value, action.payload]
        })
        builer.addCase(editdCategorySlide.fulfilled, (state:any, action) => {
            state.value = state.value.map((item: { _id: any; }) => item._id === action.payload._id ? action.payload : item)
        })
        
        builer.addCase(removeCate.fulfilled,  (state:any, action:any) => {
            state.value = state.value.filter((arrow:any) => arrow._id !== action.payload._id);   
        })

        builer.addCase(getCateById.fulfilled, (state:any, action:any) => {
            state.value = action.payload;   
        })

    },
    

})

export const { changeBreadcrumb } = categorySlide.actions
export default categorySlide.reducer;