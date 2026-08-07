import { createContext } from "react";

export const UserContext = createContext(
    // fallback value
    {
        name: "Guest",
        role: "Visitor",
        theme: "Light",
    },
);
