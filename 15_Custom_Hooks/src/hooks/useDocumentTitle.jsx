import { useEffect } from "react";

export const useDocumentTitle = (count) => {
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);
};
