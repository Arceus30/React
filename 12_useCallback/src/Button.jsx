export const Button = ({ handleClick, children }) => {
    console.log("Rendering button - ", children);
    return <button onClick={handleClick}>{children}</button>;
};

// import { memo } from "react";
// export const Button = memo(({ handleClick, children }) => {
//     console.log("Rendering button - ", children);
//     return <button onClick={handleClick}>{children}</button>;
// });
