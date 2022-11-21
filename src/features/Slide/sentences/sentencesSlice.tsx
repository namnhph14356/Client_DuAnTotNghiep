import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteSentence, listSentences } from "../../../api/sentences";
import { addVocabulary, deleteVocabulary, editVocabulary, listVocabulary } from "../../../api/vocabulary";
import { SentenceType } from "../../../types/sentence";


export const getListSentencesSlice = createAsyncThunk(
     'sentences/getListSentencesSlice',
     async () => {
          const { data } = await listSentences()
          return data
     }
)

export const addSentencesSlice = createAsyncThunk(
     'sentences/addSentencesSlice',
     async (week: SentenceType) => {
          const { data } = await addVocabulary(week)
          return data
     }
)

export const editSentencesSlice = createAsyncThunk(
     'sentences/editSentencesSlice',
     async (week: SentenceType) => {
          const { data } = await editVocabulary(week)
          return data
     }
)

export const removeSentencesSlice = createAsyncThunk(
     'sentences/removeSentencesSlice',
     async (arr: any) => {
          if (Array.isArray(arr)) {

               let dataRemove: SentenceType[] = []
               for (let i = 0; i < arr.length; i++) {
                    const { data } = await deleteSentence(arr[i].id)
                    dataRemove.push(data)
               }
               return dataRemove
          } else {
               const { data } = await deleteSentence(arr)
               return data
          }
     }
)

const sentencesSlice = createSlice({
     name: "sentences",
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
          
          builder.addCase(getListSentencesSlice.fulfilled, (state, action) => {
               state.value = action.payload
          })
          builder.addCase(addSentencesSlice.fulfilled, (state: any, action) => {
               state.value = [...state.value, action.payload]
          })
          builder.addCase(editSentencesSlice.fulfilled, (state: any, action) => {
               state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
          })
          builder.addCase(removeSentencesSlice.fulfilled, (state: any, action: any) => {
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

export const { changeBreadcrumb } = sentencesSlice.actions

export default sentencesSlice.reducer