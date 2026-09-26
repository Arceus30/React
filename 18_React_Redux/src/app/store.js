import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice.js";
import authReducer from "../features/auth/authSlice.js";
// import postsReducer from "../features/posts/postsSlice.js";
import { apiSlice } from "./api/apiSlice.js";
// import loggerMiddleware from "./middleware/loggerMiddleware.js";

// When we wrote:
// configureStore({
//     reducer: {...}
// });
// Redux Toolkit automatically included its default middleware. Among other things, development middleware helps detect:
//     accidental mutations
//     non-serializable values
//     common Redux mistakes
// It also includes thunk middleware, which is why this works:

const store = configureStore({
    // "The counter section of the Redux state is managed by counterReducer."
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        // posts: postsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // We're adding our middleware to Redux Toolkit's existing middleware.
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
