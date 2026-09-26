import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// createAsyncThunk(): It handles the lifecycle of an asynchronous operation. It creates an asynchronous action.
// Conceptually: createAsyncThunk()
//                     ├── pending
//                     ├── fulfilled
//                     └── rejected
export const loginUser = createAsyncThunk(
    // action's base type.
    // Redux Toolkit automatically generates:
    //     auth/loginUser/pending
    //     auth/loginUser/fulfilled
    //     auth/loginUser/rejected
    // You don't manually create those action types.
    "auth/loginUser",

    // When we do:
    // dispatch(
    //     loginUser({
    //         email: "john@example.com",
    //         password: "1234"
    //     })
    // ); : The object becomes credentials
    async (credentials) => {
        // Simulate an API request
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (
            credentials.email === "john@example.com" &&
            credentials.password === "1234"
        ) {
            // the payload of the fulfilled action.
            return {
                id: 1,
                name: "John",
                email: "john@example.com",
            };
        }
        throw new Error("Invalid credentials");
    },
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    // Used for actions defined by this slice:
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    // Used when this slice needs to respond to actions created elsewhere.
    // Our thunk: loginUser is created outside the reducers object.
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
