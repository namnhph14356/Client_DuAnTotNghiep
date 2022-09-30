import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



const TimeLimitCountdownSlice = createSlice({
    name: "userListenWrite",
    initialState: {
        value: 0,

    },
    reducers: {
        changeTime(state, action) {
            state.value = action.payload
        }
    },
    
})
export const { changeTime } = TimeLimitCountdownSlice.actions

export default TimeLimitCountdownSlice.reducer