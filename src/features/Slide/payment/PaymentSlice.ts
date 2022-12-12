import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPayment } from "../../../api/vnpay";
export const getPaymentSlice:any = createAsyncThunk(
  "payment/getPaymentSlice",
  async () => {
      const {data} = await getPayment();
      return data;
  }
)

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    value: [],
    otp: [],
    isAuthticated: false,
    breadcrumb: ""
  },
  reducers: {
    changeBreadcrumb(state, action) {
      state.breadcrumb = action.payload
 }
  },

  extraReducers: (builer) => {
    builer.addCase(getPaymentSlice.fulfilled, (state, action) => {
      state.value = action.payload;
    })
  }
})

export const { changeBreadcrumb } = paymentSlice.actions
export default paymentSlice.reducer;
