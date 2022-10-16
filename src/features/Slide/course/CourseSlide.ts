import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCourse, editCourse, listCourse, removeCourse } from "../../../api/course";
import { CourseType } from "../../../types/course";





export const getListCourseSlice = createAsyncThunk(
     'courses/getListCourse',
     async () => {
          const { data } = await listCourse()
          return data
     }
)

export const addCourseSlice = createAsyncThunk(
     'courses/addCourse',
     async (Course: CourseType) => {
          const { data } = await addCourse(Course)
          return data
     }
)

export const editCourseSlice = createAsyncThunk(
     'courses/editCourse',
     async (Course: CourseType) => {
          const { data } = await editCourse(Course)
          return data
     }
)

export const removeCourseSlice = createAsyncThunk(
     'courses/removeCourse',
     async (arr: any) => {
          if (Array.isArray(arr)) {

               let dataRemove: CourseType[] = []
               for (let i = 0; i < arr.length; i++) {
                    const { data } = await removeCourse(arr[i].id)
                    dataRemove.push(data)
               }
               return dataRemove
          } else {
               const { data } = await removeCourse(arr)
               return data
          }
     }
)



const courseSlice = createSlice({
     
     name: "Courses",
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
          
          builder.addCase(getListCourseSlice.fulfilled, (state, action) => {
               state.value = action.payload

          })
          builder.addCase(addCourseSlice.fulfilled, (state: any, action) => {
               state.value = [...state.value, action.payload]
               
          })
          builder.addCase(editCourseSlice.fulfilled, (state: any, action) => {
               state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
               
          })
          builder.addCase(removeCourseSlice.fulfilled, (state: any, action: any) => {
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

export const { changeBreadcrumb } = courseSlice.actions

export default courseSlice.reducer