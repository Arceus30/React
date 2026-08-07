import { useState, useRef } from "react";

// in this method
// when we click on start button the time state changes and with every change the component re-renders
// By every re-render the value of stopInterval is lost
// it will throw warning: Reassigning 'stopInterval' after render has completed can cause inconsistent behavior on subsequent renders. Consider using state instead.
// export const Stopwatch = () => {
//     const [time, setTime] = useState(0);
//     let stopInterval = null;
//     const start = () => {
//         stopInterval = setInterval(() => {
//             setTime((prev) => prev + 1);
//         }, 1000);
//     };
//     const stop = () => {
//         clearInterval(stopInterval);
//     };

//     return (
//         <div>
//             <h2>Time: {time}</h2>
//             <button onClick={start}>Start</button>
//             <button onClick={stop}>Stop</button>
//         </div>
//     );
// };

// useRefs: A place to store a value that:
// persists across renders
// can be read in event handlers
// does not need to cause a re-render when it changes
export const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const stopInterval = useRef(null);

    const start = () => {
        stopInterval.current = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
    };
    const stop = () => {
        clearInterval(stopInterval.current);
    };

    return (
        <div>
            <h2>Time: {time}</h2>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
        </div>
    );
};
