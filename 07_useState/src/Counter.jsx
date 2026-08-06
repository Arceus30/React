import { useState } from "react";

export const Counter = () => {
    const [count, setCount] = useState(0);
    // currentVal, setterFunction = useState(initialVal)

    // we can also pass function to useState (lazy initialization)
    // this function will only run once during initial rendering and will not run on re-renders
    const [newCount, setNewCount] = useState(() => {
        console.log("Initial Rendering");
        return 0;
    });

    // SetState: Values vs Function
    // 1. React state updates are asynchronous: Inside an event handler, calling setCount() does not immediately change count.
    // Rule: During the same function execution, count remains the same.
    // 2. Value Update (setCount(count + x)): Each call replaces the previous pending value.
    // Remember: Value updates overwrite each other. The last value wins.
    // 3. Functional Update (setCount(prev => prev + x)): Functions are queued and processed one by one
    // Remember: Functional updates don't replace—they build on the latest state.

    // if your new state depends on the previous state, use an updater function: setCount((prev) ⇒ prev * 2)
    // if you are just setting a value directly, the regular syntax is fine: setCount(5)

    const handleClick = () => {
        setCount((prev) => prev + 1);
    };

    const handleNewClick = () => {
        setNewCount((prev) => prev + 1);
    };
    // Updating the UI is a 3-phase process:
    // trigger phase: the moment state setter function is called (like setCount). The react component does not update the UI right away, rather it pushes the change in the list of components to be re-render
    // render phase: React calls your component function again. React figures out which parts of the UI, if any, need to be updated. Re-running the function doesn't immediately change what's on screen
    // commit phase: React takes the changes it calculated during the render phase and applies them to the DOM

    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <>
            <button onClick={handleClick}>Count: {count}</button>
            <button onClick={handleNewClick}>Count: {newCount}</button>

            <input
                type="text"
                value={message}
                placeholder="Type your message"
                onChange={handleChange}
            />
        </>
    );
};
// when setCount is called:
// React updates the state value
// React re-renders the component
// useState give us the new value
// UI show the updated value
