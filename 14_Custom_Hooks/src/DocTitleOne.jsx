import { useState } from "react";
import { useDocumentTitle } from "./hooks/useDocumentTitle";

export const DocTitleOne = () => {
    const [count, setCount] = useState(0);
    useDocumentTitle(count);

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
