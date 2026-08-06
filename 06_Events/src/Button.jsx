// Handling event is a two step process

// Event handlers have access to all the component's variables and props since they're defined inside the component
export const Button = () => {
    // 1.) define a event handler function: function to be executed when the event occurs
    const handleClick = (e) => {
        // e is the event object, whenever an event is triggered an event object containing all the details of the event.
        console.log("Clicked element", e.target);
        console.log("Click coordinates", e.clientX, e.clientY);
        console.log("Which mouse button", e.button);
        alert("Thanks for liking");
    };

    // 2.) attach the event handler function to the element which will trigger the event handler, assign the fucntion to a special prop starting with 'on'
    // Note: only function name or definition is passed. Function is not called

    // function name
    // return <button onClick={handleClick}>Like</button>;

    // function definition
    return <button onClick={() => alert("Thanks for liking")}>Like</button>;
};
