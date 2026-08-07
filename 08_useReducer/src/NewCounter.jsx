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

const init = (initialValue) => {
    console.log("Init function called");
    const savedCount = localStorage.getItem("count");
    if (savedCount !== null) return parseInt(savedCount);
    return initialValue;
};
export const Counter = () => {
    // useReducer(): lazy initialization
    const [count, dispatch] = useReducer(reducer, initialValue, init);
    // const [state, dispatch] = useReducer(reducer, initialValue, intialState);

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
