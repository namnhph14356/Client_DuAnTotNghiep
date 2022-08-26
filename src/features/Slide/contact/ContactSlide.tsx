import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addContact, editContact, getContactById, listContact, removeContact } from "../../../api/contact";
import { ContactType } from "../../../types/contact";


export const getContactList:any = createAsyncThunk(
    "contact/getContact",
    async () => {
        const {data} = await listContact();
        
        return data;
    }
)

export const addContactSlide:any = createAsyncThunk(
    "contact/addContact",
    async (Contact:ContactType) => {
        const {data} = await addContact(Contact);
        
        return data;
    }
)

export const editdContactSlide:any = createAsyncThunk(
    "contact/editContact",
    async (Contact:ContactType) => {
        
        const {data} = await editContact(Contact);
        console.log(data);
        
        return data;
    }
)

export const removeContacts:any = createAsyncThunk(
    "contact/deleteContact",
    async (id:any) => {
        // console.log(id);       
        const {data} = await removeContact(id);
        // console.log(data);
        
        return data;
    }
)
export const getContactsById:any = createAsyncThunk(
    "contact/getContactById",
    async (id:any) => {
        const {data} = await getContactById(id);

        // console.log(data);
        
        return data;
    }
)

const contactSlide = createSlice({
    name:"contact",
    initialState:{
        value:[]
    },
    reducers:{

    },
    extraReducers:  (builer) => {
        builer.addCase(getContactList.fulfilled, (state, action) => {
            state.value = action.payload;
            console.log(state.value);
            
        })
        builer.addCase(addContactSlide.fulfilled, (state:any, action:any) => {
            state.value.push(action.payload)
        })
        builer.addCase(editdContactSlide.fulfilled, (state:any, action) => {
            console.log(state.value);
            state.value = state.value.map((item: { _id: any; }) => item._id === action.payload._id ? action.payload : item)
            console.log("edit state:"+ state.value);
            
        })
        
        builer.addCase(removeContacts.fulfilled,  (state:any, action:any) => {
            state.value = state.value.filter((arrow:any) => arrow._id !== action.payload._id);   
        })

        builer.addCase(getContactsById.fulfilled, (state:any, action:any) => {
           
            state.value = action.payload;   
            // console.log(action.payload);
            
        })

    },
    

})
export default contactSlide.reducer;