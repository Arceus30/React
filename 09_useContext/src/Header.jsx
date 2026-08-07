import { NavigationBar } from "./NavigationBar";

// prop drilling
// export const Header = ({ user }) => {
//     return (
//         <div>
//             <h2>Header</h2>
//             <NavigationBar user={user} />
//         </div>
//     );
// };

// useContext API
export const Header = () => {
    return (
        <div>
            <h2>Header</h2>
            <NavigationBar />
        </div>
    );
};
