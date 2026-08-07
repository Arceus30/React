import "./App.css";
import { Header } from "./Header";
import { UserContext } from "./UserContext";
import { UserContextProvider } from "./UserContextProvider";

// prop drilling
// function App() {
//     const user = {
//         name: "Bruce Wayne",
//         role: "admin",
//         theme: "dark",
//     };
//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <Header user={user} />
//         </div>
//     );
// }

// useContext API
// function App() {
//     const user = {
//         name: "Bruce Wayne",
//         role: "admin",
//         theme: "dark",
//     };
//     return (
//         <UserContext value={user}>
//             <div>
//                 <h1>Dashboard</h1>
//                 <Header />
//             </div>
//         </UserContext>
//     );
// }

// useContext API + useState
function App() {
    return (
        <UserContextProvider>
            <div>
                <h1>Dashboard</h1>
                <Header />
            </div>
        </UserContextProvider>
    );
}

export default App;
