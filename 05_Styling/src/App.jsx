import "./App.css";
import { Alert } from "./Alert";
import { Button } from "./Button";

function App() {
    return (
        <div>
            <Alert>Your changes have been saved</Alert>
            <Alert type="error">Something went wrong</Alert>
            <Button />
        </div>
    );
}

export default App;
