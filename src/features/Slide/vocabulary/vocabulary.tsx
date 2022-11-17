import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addVocabulary, deleteVocabulary, editVocabulary, listVocabulary } from "../../../api/vocabulary";
import { VocabulatyType } from "../../../types/vocabularyType";

export const getListVocabularySlice = createAsyncThunk(
     'vocabulary/getListVocabularySlice',
     async () => {
          const { data } = await listVocabulary()
          return data
     }
)

export const addVocabularySlice = createAsyncThunk(
     'vocabulary/addVocabularySlice',
     async (week: VocabulatyType) => {
          const { data } = await addVocabulary(week)
          return data
     }
)

export const editVocabularySlice = createAsyncThunk(
     'vocabulary/editVocabularySlice',
     async (week: VocabulatyType) => {
          const { data } = await editVocabulary(week)
          return data
     }
)

export const removeVocabularySlice = createAsyncThunk(
     'vocabulary/removeVocabularySlice',
     async (arr: any) => {
          if (Array.isArray(arr)) {

               let dataRemove: VocabulatyType[] = []
               for (let i = 0; i < arr.length; i++) {
                    const { data } = await deleteVocabulary(arr[i].id)
                    dataRemove.push(data)
               }
               return dataRemove
          } else {
               const { data } = await deleteVocabulary(arr)
               return data
          }
     }
)

const vocabularySlice = createSlice({
     name: "vocabulary",
     initialState: {
          value: [],
          breadcrumb: ""
     },
     reducers: {
          changeBreadcrumb(state, action) {
               state.breadcrumb = action.payload
          }
     },
     extraReducers(builder) {
          
          builder.addCase(getListVocabularySlice.fulfilled, (state, action) => {
               state.value = action.payload
          })
          builder.addCase(addVocabularySlice.fulfilled, (state: any, action) => {
               state.value = [...state.value, action.payload]
          })
          builder.addCase(editVocabularySlice.fulfilled, (state: any, action) => {
               state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
          })
          builder.addCase(removeVocabularySlice.fulfilled, (state: any, action: any) => {
               if (Array.isArray(action.payload)) {
                    const payload = {
                         excludeIds: action.payload.map(item => {
                              return item._id
                         })
                    }
                    state.value = state.value.filter(item => !payload.excludeIds.includes(item._id))
               } else {
                    state.value = state.value.filter(item => item._id !== action.payload._id)
               }

          })
     },
})

export const { changeBreadcrumb } = vocabularySlice.actions

export default vocabularySlice.reducer