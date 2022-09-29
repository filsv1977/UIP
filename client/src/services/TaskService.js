import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


export const tasksAPI = createApi({
  reducerPath: "tasksAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  tagTypes: ['Edit'],
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
      providesTags: result => ['Edit']
    }),
    editTask: build.mutation({
      query: (post) => ({
        url: `/tasks/${post.newData.id}`,
        method: "PUT",
        body: post
      }),
      invalidatesTags: result=> ['Edit']
    }),
  })
})