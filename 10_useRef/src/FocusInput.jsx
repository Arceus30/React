import { useRef } from "react";

export const FocusInput = () => {
    const inpRef = useRef(null);
    return (
        <div>
            <input ref={inpRef} type="text" placeholder="Enter Name" />
            <button onClick={() => inpRef.current.focus()}>Focus Input</button>
        </div>
    );
};
