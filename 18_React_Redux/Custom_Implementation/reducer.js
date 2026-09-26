// "Given the current state and this action, what should the next state be?"
const initialState = {
    count: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                count: state.count + 1,
            };

        case "DECREMENT":
            return {
                ...state,
                count: state.count - 1,
            };

        default:
            return state;
    }
}

export default reducer;
