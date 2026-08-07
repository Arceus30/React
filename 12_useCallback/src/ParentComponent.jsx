import { useState, useCallback } from "react";
import { Count } from "./Count";
import { Button } from "./Button";
import { Title } from "./Title";

export const ParentComponent = () => {
    const [age, setAge] = useState(25);
    const [salary, setSalary] = useState(40000);

    const incrementAge = () => {
        setAge((prev) => prev + 1);
    };
    const incrementSalary = () => {
        setSalary((prev) => prev + 10000);
    };

    return (
        <div>
            <Title />
            <Count text="Age" count={age} />
            <Button handleClick={incrementAge}> Increment Age </Button>
            <Count text="Salary" count={salary} />
            <Button handleClick={incrementSalary}> Increment Salary </Button>
        </div>
    );
};

// In React 19, useCallback still exists, but they are generally less needed because of improvements in the React compiler (when enabled). The compiler can automatically memoize functions in many cases, reducing the need for manual optimization.
//      const memoizedCallback = useCallback(() => {
//          function body
//      }, [dependencies]);
// React returns the same function instance between renders until one of the dependencies changes.
// Use useCallback when:
// You're not using the React Compiler, or
// Profiling shows it prevents unnecessary renders or expensive recalculations.

// import { useState, useCallback } from "react";
// import { Count } from "./Count";
// import { Button } from "./Button";
// import { Title } from "./Title";

// export const ParentComponent = () => {
//     const [age, setAge] = useState(25);
//     const [salary, setSalary] = useState(40000);
//     const incrementAge = useCallback(() => {
//         setAge((prev) => prev + 1);
//     }, []);

//     const incrementSalary = useCallback(() => {
//         setSalary((prev) => prev + 10000);
//     }, []);

//     return (
//         <div>
//             <Title />
//             <Count text="Age" count={age} />
//             <Button handleClick={incrementAge}> Increment Age </Button>
//             <Count text="Salary" count={salary} />
//             <Button handleClick={incrementSalary}> Increment Salary </Button>
//         </div>
//     );
// };
