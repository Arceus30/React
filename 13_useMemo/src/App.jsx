import { useMemo, useState } from "react";
import "./App.css";

// useMemo memoize the value so that it doesn't have to be computed again and again
// it only computes again when the dependencies changes
function App() {
    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);

    // const isEven = () => {
    //     for (let i = 0; i < 2e8; i++) {}
    //     return countOne % 2 == 0;
    // };
    const isEven = useMemo(() => {
        for (let i = 0; i < 2e8; i++) {}
        return countOne % 2 == 0;
    }, [countOne]);

    return (
        <div>
            <div>
                <button onClick={() => setCountOne(countOne + 1)}>
                    {countOne}
                </button>
                {/* <p>{isEven() && "Even"}</p> */}
                <p>{isEven && "Even"}</p>
            </div>
            <div>
                <button onClick={() => setCountTwo(countTwo + 1)}>
                    {countTwo}
                </button>
            </div>
        </div>
    );
}

export default App;
