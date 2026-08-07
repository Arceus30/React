import { useState, useEffect } from "react";

// useEffect lets you run side effects after a component renders
// dependency array should be thought of as a way to let react know about everything react must watch for changes
// Dependency array     When it runs
// No array             After every render
// []                   Once after the initial render
// [value]              After the initial render and whenever value changes
// [a, b]               After the initial render and whenever a or b changes

// Rule of thumb
// Ask yourself: "Am I synchronizing my component with something outside of React?"
// Yes → Use useEffect.
// No → You probably don't need useEffect. Compute values during rendering or handle logic in event handlers instead.

export const CounterOne = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;

        // Use a cleanup function to release resources:
        // Cleanup runs:
        // Before the effect runs again (if dependencies change)
        // When the component unmounts
        return () => {
            document.title = 0;
        };
    }, [count]);

    return (
        <div>
            Count: {count}
            <div>
                <button
                    onClick={() => {
                        setCount((prev) => prev + 1);
                    }}
                >
                    Increment
                </button>
            </div>
        </div>
    );
};
