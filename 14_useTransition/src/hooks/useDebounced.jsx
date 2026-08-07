import { useState, useEffect } from "react";

export const useDebounced = (val, delay = 500) => {
    const [debouncedVal, setDebouncedVal] = useState(val);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedVal(val);
        }, delay);
        return () => {
            clearTimeout(timer);
        };
    }, [val, delay]);

    return debouncedVal;
};
