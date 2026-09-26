import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// createApi: Creates our RTK Query API service.
export const apiSlice = createApi({
    reducerPath: "api",

    // baseQuery: Defines how requests are made, is a lightweight wrapper around fetch.
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com",
    }),

    tagTypes: ["Post"],

    // endpoints: Defines the API operations.
    // RTK Query divides API operations primarily into:
    // Query: Used to retrieve data.
    // Mutation: Used to change data.
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "/posts",

            // "The data returned by this query represents Post data." So RTK Query associates the cached result with:
            providesTags: ["Post"],
        }),
        createPost: builder.mutation({
            query: (post) => ({
                url: "/posts",
                method: "POST",
                body: post,

                // "After this mutation succeeds, the Post data may be stale."
                // RTK Query sees: getPosts --> provides "Post" and createPost --> invalidates "Post". Therefore it can refetch the affected query.
                // Invalidation does not mean "delete the data from Redux immediately."
                invalidatesTags: ["Post"],
            }),
        }),
    }),
});

export const { useGetPostsQuery, useCreatePostMutation } = apiSlice;
