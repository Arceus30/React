import { useReducer } from "react";

const init = (initial) => {
    if (typeof initial === "function") {
        return initial( );
    }
    return initial;
};

const useStateCustom = (initialVal) => {
    const reducer = (state, action) => {
        if (typeof action === "function") {
            return action(state);
        }
        return action;
    };
    const [state, dispatch] = useReducer(reducer, initialVal);

    const setState = (newVal) => {
        dispatch(newVal);
    };

    return [state, setState];
};

export const CustomCounter = () => {
    const [count, setCount] = useStateCustom(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount((prev) => prev - 1)}>
                Decrement
            </button>
        </div>
    );
};
