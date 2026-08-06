import React from "react";

export const HelloWithJSX = () => {
    return (
        <div id="container">
            <h3>Hello Keshav (With JSX)</h3>
        </div>
    );
};

export const HelloWithoutJSX = () => {
    const helloH3 = React.createElement("h3", {}, "Hello Keshav (Without JSX)");
    return React.createElement("div", { id: "container" }, helloH3);
};
