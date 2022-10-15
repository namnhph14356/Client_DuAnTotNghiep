import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addClass,
  editClass,
  getClassById,
  listClass,
  removeClass,
} from "../../../api/class";
import { ClassType } from "../../../types/Class";

export const getListClass: any = createAsyncThunk(
  "class/getListClass",
  async () => {
    const { data } = await listClass();
    return data;
  }
);

export const createClass: any = createAsyncThunk(
  "class/createClass",
  async (classAdd: ClassType) => {
    const { data } = await addClass(classAdd);
    return data;
  }
);

export const updateClass: any = createAsyncThunk(
  "class/updateClass",
  async (classUpdate: ClassType) => {
    const { data } = await editClass(classUpdate);
    return data;
  }
);

export const removeClasses: any = createAsyncThunk(
  "class/deleteClass",
  async (id: any) => {
    const { data } = await removeClass(id);
    return data;
  }
);
export const getClassByIdSlide: any = createAsyncThunk(
  "class/getClassById",
  async (id: any) => {
    const { data } = await getClassById(id);
    return data;
  }
);

interface InitialState {
  listClass: any[];
  class: object;
  error: String;
  loading: boolean;
}

const initialState: InitialState = {
  listClass: [],
  class: {},
  error: "",
  loading: false,
};

const classSlide = createSlice({
  name: "class",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListClass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getListClass.fulfilled, (state, action) => {
      state.listClass = action.payload;
      state.loading = false;
    });
    builder.addCase(getListClass.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createClass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createClass.fulfilled, (state, action) => {
      state.listClass = [...state.listClass, action.payload?.class];
      state.loading = false;
    });
    builder.addCase(createClass.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateClass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateClass.fulfilled, (state, action) => {
      state.listClass = [...state.listClass.filter((item) => item._id !== action.payload?.class._id), action.payload?.class];
      state.loading = false;
    });
    builder.addCase(updateClass.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(removeClasses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeClasses.fulfilled, (state, action) => {
      state.listClass = state.listClass.filter((item) => item._id !== action.payload?.class?._id);
      state.loading = false;
    });
    builder.addCase(removeClasses.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getClassByIdSlide.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClassByIdSlide.fulfilled, (state, action) => {
      state.class = action.payload.class;
      state.loading = false;
    });
    builder.addCase(getClassByIdSlide.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default classSlide.reducer;
