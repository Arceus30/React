import "./App.css";
import { Counter } from "./Counter";
import { ShoppingCart } from "./ShoppingCart";
import { CustomCounter } from "./CustomCounter";

function App() {
    return (
        <>
            <Counter />
            <ShoppingCart />
            <CustomCounter />
        </>
    );
}

export default App;
