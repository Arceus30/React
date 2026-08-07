import { useCounter } from "./hooks/useCounter";

export const CounterOne = () => {
    const [count, inc, dec, res] = useCounter(0);
    return (
        <div>
            {count}
            <div>
                <button onClick={inc}>Increment</button>
            </div>
            <div>
                <button onClick={dec}>Decrement</button>
            </div>
            <div>
                <button onClick={res}>Reset</button>
            </div>
        </div>
    );
};
