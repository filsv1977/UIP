import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


export const tasksAPI = createApi({
  reducerPath: "tasksAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  tagTypes: ['tasks'],
  mode: "no-cors",
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET') //
    headers.set('Access-Control-Allow-Headers', '*') //
    return headers
  },
  endpoints: (build) => ({
    fetchAllTasks: build.query({
      query: (arg) => ({
        url: "/tasks"
      }),
      providesTags: ['tasks']
    }),
    editTask: build.mutation({
      query: (put) => ({
        url: `/admin/tasks/${put.id}`,
        method: "PATCH",
        body: put.body
      }),
      invalidatesTags: ['tasks']
    }),
  })
})