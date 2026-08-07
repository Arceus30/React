import "./App.css";
import { CounterOne } from "./CounterOne";
import { useState } from "react";
import { IntervalCounter } from "./IntervalCounter";
import { DataFetching } from "./DataFetching";

function App() {
    const [display, setDisplay] = useState(false);
    return (
        <div>
            App
            <div>
                <button onClick={() => setDisplay((prev) => !prev)}>
                    Toggle Simple Counter
                </button>
            </div>
            {display && <CounterOne />}
            <IntervalCounter />
            <DataFetching />
        </div>
    );
}

export default App;
