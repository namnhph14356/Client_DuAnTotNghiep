import { createSlice } from "@reduxjs/toolkit";


const countSlide = createSlice({
    // tên
    name: "1",
    initialState: {
        value: 1
    },
    reducers: {
        increment(state:any){
            state.value += 1
        },
        decrement(state){
            state.value -= 1
        },
        increase(state, action){
            state.value +=action.payload
        }
    }
})

export const { increment, decrement, increase} = countSlide.actions
export default countSlide.reducer;