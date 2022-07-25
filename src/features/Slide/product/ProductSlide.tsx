import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { add, listProduct } from "../../../api/product";
// import { add, listProduct } from "../../api/product";


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
            // console.log(action);
            // state.value.push(action.payload)
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductList.fulfilled, (state, action) => {
            console.log(action.payload);
            state.value = action.payload
        })

        builder.addCase(addProduct.fulfilled, (state:any, action:any) => {
            console.log(action.payload);
             console.log(state.value );
             
            state.value.push(action.payload)
        })

    }
    
});

// export const {addProduct} = productSlide.actions

export default productSlide.reducer;