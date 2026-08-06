import React from "react";

// With JSX - clean and readable
export const CardWithJSX = () => {
    return (
        <div id="card">
            <h2>Welcome (With JSX)</h2>
            <p>
                This is a <span id="highlight">paragraph</span> with text
            </p>
            <button>Click me</button>
        </div>
    );
};

// Without JSX
export const CardWithoutJSX = () => {
    const WelcomeH2 = React.createElement("h2", {}, "Welcome (Without JSX)");
    const WelcomeP = React.createElement(
        "p",
        {},
        "This is a ",
        React.createElement("span", { id: "highlight" }, "paragraph"),
        " with text",
    );
    const WelcomeButton = React.createElement("button", {}, "Click me");
    return React.createElement(
        "div",
        { id: "card" },
        WelcomeH2,
        WelcomeP,
        WelcomeButton,
    );
};
