import { ThunkMiddleware } from 'redux-thunk';
import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistReducer,
   persistStore
 
 } from "redux-persist";
 import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import authSlide from '../features/Slide/auth/authSlide';

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    // "user" // những state ko muốn lưu ở trên local thì cho vào đây, tên theo tên của slide
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export default persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
