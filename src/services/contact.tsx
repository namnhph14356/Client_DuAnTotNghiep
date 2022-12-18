import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://serverduantotnghiep-production-53a7.up.railway.app/api" }),
    tagTypes: ["Contact"],
    endpoints: (builder) => ({
        getAllContact: builder.query({
            query: () => "/contact",
            providesTags: ["Contact"],
        }),
        getContact: builder.query({
            query: (id) => "/contact/" + id,
            providesTags: ["Contact"],
        }),
        addContact: builder.mutation({
            query: (contact) => ({
                url: "/contact",
                method: "POST",
                body: contact,
            }),
            invalidatesTags: ["Contact"],
        }),
        removeContact: builder.mutation({
            query: (id) => ({
                url: "/contact/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Contact"],
        }),
        updateContact: builder.mutation({
            query: (contact) => ({
                url: "/contact/" + contact._id,
                method: "PUT",
                body: contact,
            }),
            invalidatesTags: ["Contact"],
        }),
    }),
});

export const { useAddContactMutation, useGetAllContactQuery, useGetContactQuery, useRemoveContactMutation, useUpdateContactMutation } = contactApi
