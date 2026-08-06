import "./App.css";
import { Counter } from "./Counter";

function App() {
    return (
        <>
            <h1>Intro to React State</h1>
            <Counter />
        </>
    );
}

export default App;

// Rules of React Hooks:
// Only call hooks at the top level of the function (not inside loops, conditions, nested functions or try catch blocks)
// Only call hooks from react functions (from react components or custom hooks)

// Changing variables doesn't make React update the screen (no re-render)
// Variables reset everytime the component renders (no persistence)

// State: Component's Memory
// It triggers a re-render when it changes (solving screen update problem)
// persists between renders (solving reset problem)

// Props Vs State
// Props are like arguments passed to a function. They come from outside and you can't change them
// State is like the component's personal memory and it belongs to the component and the component can change it

// When State is required:
// Does this data need to change over time?
// Should the UI update when this data changes?
// Does the component need to "remember" this between renders?
