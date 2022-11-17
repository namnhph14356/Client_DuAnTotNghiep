import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addGrammar, deleteGrammar, getListGrammar, updateGrammar } from "../../../api/grammar";
import { GrammarType } from "../../../types/grammar";

export const getListGrammarSlice = createAsyncThunk(
  'grammar/getListGrammarSlice',
  async () => {
    const { data } = await getListGrammar()
    return data
  }
)

export const addGrammarSlice = createAsyncThunk(
  'grammar/addGrammarSlice',
  async (value: GrammarType) => {
    const { data } = await addGrammar(value)
    return data
  }
)

export const editGrammarSlice = createAsyncThunk(
  'grammar/editGrammarSlice',
  async (value: GrammarType) => {
    const { data } = await updateGrammar(value)
    return data
  }
)

export const removeGrammarSlice = createAsyncThunk(
  'grammar/removeGrammarSlice',
  async (arr: any) => {
    if (Array.isArray(arr)) {

      let dataRemove: GrammarType[] = []
      for (let i = 0; i < arr.length; i++) {
        const { data } = await deleteGrammar(arr[i].id)
        dataRemove.push(data)
      }
      return dataRemove
    } else {
      const { data } = await deleteGrammar(arr)
      return data
    }
  }
)

const grammarSlice = createSlice({
  name: "grammar",
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

    builder.addCase(getListGrammarSlice.fulfilled, (state, action) => {
      state.value = action.payload
    })
    builder.addCase(addGrammarSlice.fulfilled, (state: any, action) => {
      state.value = [...state.value, action.payload]
    })
    builder.addCase(editGrammarSlice.fulfilled, (state: any, action) => {
      state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
    })
    builder.addCase(removeGrammarSlice.fulfilled, (state: any, action: any) => {
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

export const { changeBreadcrumb } = grammarSlice.actions

export default grammarSlice.reducer