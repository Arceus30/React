import "./App.css";
import { DocTitleOne } from "./DocTitleOne.jsx";
import { DocTitleTwo } from "./DocTitleTwo.jsx";
import { CounterOne } from "./CounterOne.jsx";
import { CounterTwo } from "./CounterTwo.jsx";
import { UserForm } from "./UserForm.jsx";

// custom hooks: JS function whose name start with use. custom hook can call other hooks
// Create one when you notice the same logic being repeated across multiple components.
// 1.) Reusing API calls
// 2.) Form handling
// 3.) Authentication
// 4.) Window events
// 5.) Debouncing search input
//Create a custom hook when:
// ✅ Two or more components share the same React state or effect logic.
// ✅ You want to make components smaller and easier to read.
// ✅ You want to encapsulate complex state management or side effects behind a simple API.

//                Debouncing                            vs.                   throttling
// Runs after the user stops triggering events      	        Runs at a fixed interval while events continue
// Best for search boxes, autocomplete, form validation   	  Best for scroll, resize, mouse movement, drag events
// Can skip intermediate events	                              Executes periodically regardless of continued events

// Use debouncing for operations that should happen only after the user has finished interacting, such as:
// Search/autocomplete API calls
// Live form validation
// Filtering large lists
// Saving drafts after the user stops typing
// Expensive computations triggered by rapid input

function App() {
    return (
        <div>
            App
            <DocTitleOne />
            <DocTitleTwo />
            <CounterOne />
            <CounterTwo />
            <UserForm />
        </div>
    );
}

export default App;
