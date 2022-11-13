import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const googleSpeechSlice = createSlice({

    name: "googleSpeech",
    initialState: {
        speechValue: {},
        transcript: "",
        isFinish: false,
        arrReset : []
    },
    reducers: {
        changeSpeechValue(state, action) {
            if (action.payload === "") {
                state.speechValue = {}
                state.transcript = ""
            } else {
                state.speechValue = action.payload
                state.transcript = action.payload.results[0].alternatives[0].transcript.toLowerCase()
            }
        },
        changeArrReset(state, action) {
            state.arrReset = action.payload
        },
        changeSpeechFinish(state, action) {
            state.isFinish = action.payload
        },
        resetSpeechValue(state, action){
            state.speechValue = {}
            state.transcript = ""
        }
    }
})

export const { changeSpeechValue, changeSpeechFinish, resetSpeechValue, changeArrReset } = googleSpeechSlice.actions

export default googleSpeechSlice.reducer