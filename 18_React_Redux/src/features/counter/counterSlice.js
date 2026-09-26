import { createSlice } from "@reduxjs/toolkit";

// defines the initial state managed by this slice.
const initialState = {
    count: 0,
};

// This one function automatically creates several things for us.
// createSlice()
//      ├── reducer
//      ├── action creators
//      └── action types
// createSlice() generates reducer and action creators and the action creators generate actions
// A slice usually represents a feature/domain, not necessarily one variable.
const counterSlice = createSlice({
    // Redux Toolkit uses this to namespace the generated action types.
    // So: "increment" becomes an action type like: "counter/increment"
    // This is useful because different features might both have actions called reset, remove, etc.
    name: "counter",
    initialState,
    reducers: {
        // When the increment action occurs, increase count.
        increment(state) {
            // This: state.count += 1; is written using a convenient mutable-looking syntax, but Immer produces the appropriate immutable state update behind the scenes.
            // Redux state updates are immutable; Immer lets Redux Toolkit express those updates using simpler mutation-like syntax.
            state.count += 1;
        },
        // When the decrement action occurs, decrease count.
        decrement(state) {
            state.count -= 1;
        },

        incrementByAmount(state, action) {
            state.count += action.payload;
        },

        reset(state) {
            state.count = 0;
        },
    },
});

export const { increment, decrement, incrementByAmount, reset } =
    counterSlice.actions;
export default counterSlice.reducer;
