import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listWellcome } from "../../../api/welcome";

export const getWelcome:any = createAsyncThunk (
    "wellcome/getWellcome",
    async () => {
        const {data} = await listWellcome()
        return data
    }
)

const wellcome = createSlice({
    name:"wellcome",
    initialState: {
        value: [],
    },
    reducers:{

    },
    extraReducers: (builer) => {
        builer.addCase(getWelcome.fulfilled, (state, action) => {
            state.value = action.payload;
            console.log(state.value);
            
        })
    }
})

export default wellcome.reducer;