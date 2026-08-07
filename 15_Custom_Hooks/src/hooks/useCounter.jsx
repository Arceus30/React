import { useState } from "react";

export const useCounter = (cnt) => {
    const [count, setCount] = useState(cnt);
    const inc = () => {
        setCount((prev) => prev + 1);
    };
    const dec = () => {
        setCount((prev) => prev - 1);
    };
    const res = () => {
        setCount(0);
    };

    return [count, inc, dec, res];
};
