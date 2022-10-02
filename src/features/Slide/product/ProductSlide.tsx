import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { add, listProduct } from "../../../api/product";

export const getProductList:any = createAsyncThunk(
    "product/getProducts",
    async () => {
        const {data} = await listProduct();
        return data
    }
)

export const addProduct:any = createAsyncThunk(
    "product/addProduct",
    async (product) => {
        const {data} = await add(product);
        return data
    }
)
const productSlide = createSlice({
    name: "product",
    initialState:{
        value:[]
    },
    reducers:{
        addProduct(state, action){
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductList.fulfilled, (state, action) => {
            state.value = action.payload
        })

        builder.addCase(addProduct.fulfilled, (state:any, action:any) => {
            state.value.push(action.payload)
        })

    }
    
});

export default productSlide.reducer;