import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";

// Simple Approach for different states of different operations
// "idle" means operation not started
//       fetchPosts()
// idle ───────────────→ loading
//                         │
//                ┌────────┴────────┐
//                ↓                 ↓
//            succeeded           failed
// const initialState = {
//     posts: [],
//     fetchStatus: "idle",
//     createStatus: "idle",
//     updateStatus: "idle",
//     deleteStatus: "idle",
//     error: null,
// };

// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");

//     if (!response.ok) {
//         throw new Error("Failed to fetch posts");
//     }

//     return await response.json();
// });

// export const createPost = createAsyncThunk("posts/createPost", async (post) => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(post),
//     });

//     if (!response.ok) {
//         throw new Error("Failed to create post");
//     }

//     return await response.json();
// });

// export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
//     const response = await fetch(
//         `https://jsonplaceholder.typicode.com/posts/${post.id}`,
//         {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(post),
//         },
//     );

//     if (!response.ok) {
//         throw new Error("Failed to update post");
//     }

//     return await response.json();
// });

// export const deletePost = createAsyncThunk(
//     "posts/deletePost",
//     async (postId) => {
//         const response = await fetch(
//             `https://jsonplaceholder.typicode.com/posts/${postId}`,
//             {
//                 method: "DELETE",
//             },
//         );

//         if (!response.ok) {
//             throw new Error("Failed to delete post");
//         }

//         return postId;
//     },
// );

// const postsSlice = createSlice({
//     name: "posts",

//     initialState,

//     reducers: {},

//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchPosts.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })

//             .addCase(fetchPosts.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.posts = action.payload;
//             })

//             .addCase(fetchPosts.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(createPost.fulfilled, (state, action) => {
//                 state.posts.push(action.payload);
//             })
//             .addCase(updatePost.fulfilled, (state, action) => {
//                 const index = state.posts.findIndex(
//                     (post) => post.id === action.payload.id,
//                 );

//                 if (index !== -1) {
//                     state.posts[index] = action.payload;
//                 }
//             })
//             .addCase(deletePost.fulfilled, (state, action) => {
//                 state.posts = state.posts.filter(
//                     (post) => post.id !== action.payload,
//                 );
//             });
//     },
// });

// export default postsSlice.reducer;

// createEntityAdapter is a utility from Redux Toolkit for managing normalized collections of entities in Redux state.
// It gives you:
// 1.) Normalized state: {ids: [], entities: {}}

// 2.) Reducers:
//     postsAdapter.addOne(...)
//     postsAdapter.addMany(...)
//     postsAdapter.updateOne(...)
//     postsAdapter.removeOne(...)
//     postsAdapter.removeMany(...)
//     postsAdapter.setAll(...)
// 3.) Selectors:
//     const postsSelectors = postsAdapter.getSelectors((state) => state.posts);
//         postsSelectors.selectAll(state);
//         postsSelectors.selectById(state, 1);
//         postsSelectors.selectIds(state);
//         postsSelectors.selectTotal(state);
const postsAdapter = createEntityAdapter();
// The initial state is roughly: { ids: [], entities: {}, loading: false, error: null }
const initialState = postsAdapter.getInitialState({
    loading: false,
    error: null,
});

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // these reducer functions are provided by the adapter
        postAdded: postsAdapter.addOne,
        postUpdated: postsAdapter.updateOne,
        postRemoved: postsAdapter.removeOne,
    },
});
