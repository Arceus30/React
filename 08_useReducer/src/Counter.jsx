import { useReducer } from "react";
const initialState = 0;
// action instructs the reducer how to update the state
const reducer = (state, action) => {
    // return new state
    switch (action) {
        case "Inc":
            return state + 1;
        case "Dec":
            return state - 1;
        case "Res":
            return initialState;
        default:
            return state;
    }
};
export const Counter = () => {
    const [count, dispatch] = useReducer(reducer, initialState);
    // const [state, dispatch] = useReducer(reducer, intialState);

    return (
        <div>
            Counter: {count}
            <br />
            <button onClick={() => dispatch("Inc")}>Increment</button>
            <br />
            <button onClick={() => dispatch("Dec")}>Decrement</button>
            <br />
            <button onClick={() => dispatch("Res")}>Reset</button>
            <br />
        </div>
    );
};
