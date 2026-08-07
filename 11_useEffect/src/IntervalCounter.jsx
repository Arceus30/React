// import { useState, useEffect } from "react";
// export const IntervalCounter = () => {
//     const [count, setCount] = useState(1);
//     const tick = () => {
//         setCount((prev) => prev + 1);
//     };
//     useEffect(() => {
//      Even though `tick` is created only once, it doesn't need the current value of `count`. The functional updater receives the latest state from React each time it runs, so the interval always increments the current count.
//         const intervalId = setInterval(tick, 1000);
//         return () => {
//             clearInterval(intervalId);
//         };
//     }, []);

//     return <div>{count}</div>;
// };

import { useState, useEffect } from "react";
export const IntervalCounter = () => {
    const [count, setCount] = useState(1);
    const tick = () => {
        setCount(count + 1);
    };
    useEffect(() => {
        // tick remembers the initial value of count forever and it calls setCount(1+1) everytime
        const intervalId = setInterval(tick, 1000);
        return () => {
            clearInterval(intervalId);
        };

        // without [count] it will appear as if the count is stuck at value 2
        // with [count], the useEffect checks for changes in count --> it re-renders --> cleanup function is called --> new interval is created with new count value
    }, [count]);

    return <div>{count}</div>;
};
