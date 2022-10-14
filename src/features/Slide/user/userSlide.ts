import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUser, editUser, getListUser, getUserById, removeUser } from "../../../api/user";
import { UserType } from "../../../types/user";

export interface UserSlice {
  value: UserType[],
  otp: string[],
  isAuthticated: boolean
}

export const getUserList = createAsyncThunk(
  "user/getListUser",
  async () => {
    const { data } = await getListUser();
    return data
  }
)

export const getUser = createAsyncThunk(
  "user/getUserById",
  async (id: string) => {
    const { data } = await getUserById(id);
    return data
  }
)

export const addUserSlide = createAsyncThunk(
  "user/addUser",
  async (user: UserType) => {
    const { data } = await addUser(user);
    return data
  }
)

export const editUserSlide = createAsyncThunk(
  "user/editUser",
  async (user: UserType) => {
    const { data } = await editUser(user);
    return data
  }
)

export const removeUserSlide = createAsyncThunk(
  "user/removeUser",
  async (id: string) => {
    const { data } = await removeUser(id);
    return data
  }
)

const authSlide = createSlice({
  name: "user",
  initialState: {
    value: [],
    otp: [],
    isAuthticated: false
  },
  reducers: {
  },

  extraReducers: (builer) => {
    builer.addCase(getUserList.fulfilled, (state, action) => {
      state.value = action.payload;
    })
    builer.addCase(addUserSlide.fulfilled, (state: UserSlice, action) => {
      state.value = [...state.value, action.payload]
    })
    builer.addCase(editUserSlide.fulfilled, (state: UserSlice, action) => {
      state.value = state.value.map((item: UserType) => item._id === action.payload._id ? action.payload : item)
    })
    builer.addCase(removeUserSlide.fulfilled, (state: UserSlice, action) => {
      state.value = state.value.filter((arrow: UserType) => arrow._id !== action.payload._id);
    })
  }
})

export default authSlide.reducer;
