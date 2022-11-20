
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changeOTP, getUserById, editUser, forgotPass, getCurrenUser, login, newPassword, register, signInWidthFacebook, signInWidthGoogle, newPasswordUser } from "../../../api/user";
import { UserType } from "../../../types/user";

export interface AuthSlice {
  value: Object,
  otp: string,
  isAuthticated: boolean
}

export const currentUserSlice = createAsyncThunk(
  "auth/currentUserSlice",
  async () => {
    const { data } = await getCurrenUser();
    return data
  }
)

export const signIn = createAsyncThunk(
  "auth/login",
  async (user: { email: string, password: string | number }) => {
    const { data } = await login(user);
    return data
  }
)

export const signInWidthFacebookSlice = createAsyncThunk(
  "auth/signInWidthFacebookSlice",
  async (user: { id: string, email: string, name: string, img: string }) => {
    const { data } = await signInWidthFacebook(user);
    return data
  }
)

export const signInWidthGoogleSlice = createAsyncThunk(
  "auth/signInWidthGoogleSlice",
  async (user: { id: string, email: string, name: string, img: string }) => {
    const { data } = await signInWidthGoogle(user);
    return data
  }
)

export const signUp = createAsyncThunk(
  "auth/register",
  async (user: { username: string, email: string, password: string | number, img: string }, { rejectWithValue }) => {
    try {
      const { data } = await register(user);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: { email: string }) => {
    const { data } = await forgotPass(email);
    return data
  }
)

export const newPass = createAsyncThunk(
  "auth/changePassword",
  async (email: { email: string, password: string }) => {
    const { data } = await newPassword(email);
    return data
  }
)
export const newPassSlice = createAsyncThunk(
  "auth/changePasswords",
  async (password: { password: string }) => {
    const { data } = await newPasswordUser(password);
    console.log('data slice', data);
    
    return data
  }
)

export const editUserSilce:any = createAsyncThunk(
  "auth/editUser",
  async (user: UserType) => {
    const { data } = await editUser(user);
    return data;
  }
)

export const getUserByIdSlice: any = createAsyncThunk(
  "auth/getUserById",
  async (id: any) => {
    const { data } = await getUserById(id)
    return data;
  }
)

const authSlide = createSlice({
  name: "auth",
  initialState: {
    value: {},
    otp: '',
    isAuthticated: false
  },
  reducers: {
    logout(state: AuthSlice, action) {
      localStorage.removeItem("tokenUser");
      state.value = "";
    },
  },

  extraReducers: (builer) => {
    builer.addCase(currentUserSlice.fulfilled, (state: AuthSlice, action) => {
      if (action.payload) {
        state.value = action.payload
      }
    })
    builer.addCase(signInWidthFacebookSlice.fulfilled, (state: AuthSlice, action) => {
      if (action.payload) {
        state.value = action.payload
      }
    })
    builer.addCase(signInWidthGoogleSlice.fulfilled, (state: AuthSlice, action) => {
      if (action.payload) {
        state.value = action.payload
      }
    })
    builer.addCase(signUp.fulfilled, (state: AuthSlice, action) => {
      state.value = action.payload
    })
    builer.addCase(forgotPassword.fulfilled, (state: AuthSlice, action) => {
    })
    builer.addCase(newPass.fulfilled, (state: AuthSlice, action) => {
    })
    builer.addCase(newPassSlice.fulfilled, (state: AuthSlice, action) => {
    })
    builer.addCase(editUserSilce.fulfilled, (state: any, action) => {
      console.log('payload', action.payload);
      console.log('state', state.value);
      // state.value = state.value.map((item: { _id: any; }) => item._id === action.payload._id ? action.payload : item)
      state.value = action.payload;
    })
    builer.addCase(getUserByIdSlice.fulfilled, (state: any, action: any) => {
      state.value = action.payload;
    })
  }
})
export const { logout } = authSlide.actions
export default authSlide.reducer;
