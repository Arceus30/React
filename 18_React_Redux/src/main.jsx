import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Provider makes the Redux store available to React components.
//         Redux Store
//             │
//             │
//        <Provider>
//             │
//    ┌────────┼────────┐
//    │        │        │
// Navbar     App     Counter
// Without: <Provider store={store}> components cannot use useSelector(), useDispatch()
import { Provider } from "react-redux";
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* Connect the Store to React */}
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);
