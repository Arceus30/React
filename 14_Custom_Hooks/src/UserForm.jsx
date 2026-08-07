import { useState } from "react";
import { useInput } from "./hooks/useInput";

export const UserForm = () => {
    const [firstName, firstInp, firstReset] = useInput("");
    const [lastName, lastInp, lastReset] = useInput("");

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        alert(`${firstName} ${lastName}`);
        firstReset();
        lastReset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">FirstName:</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        {...firstInp}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">LastName:</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        {...lastInp}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
};
