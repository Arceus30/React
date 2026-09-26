import "./App.css";
import Counter from "./features/counter/Counter.jsx";
import Auth from "./features/auth/Auth.jsx";
// import Posts from "./features/posts/Posts.jsx";

function App() {
    return (
        <>
            <div>
                <h1>Redux Lab</h1>
                <Counter />
                <Auth />
                {/* <Posts /> */}
            </div>
        </>
    );
}

export default App;
