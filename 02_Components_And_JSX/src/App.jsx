import "./App.css";
// React component imported from another file
import NewWelcome from "./NewWelcome";
// default import
// import NewButton from "./NewButton";
// named import
import { NewButton } from "./NewButton";

import { HelloWithJSX, HelloWithoutJSX } from "./Hello";
import { CardWithJSX, CardWithoutJSX } from "./Card";

import { CandidateProfile } from "./CandidateProfile";

// React components defined in the same file
function Welcome() {
    return <h2>Welcome to React</h2>;
}
function Button() {
    return <button>Click Me</button>;
}

function App() {
    return (
        <div>
            <h1>React</h1>
            <Welcome />
            <Button />
            <NewWelcome />
            <NewButton />
            <HelloWithJSX />
            <HelloWithoutJSX />
            <CardWithJSX />
            <CardWithoutJSX />
            <CandidateProfile />
        </div>
    );
}

export default App;
