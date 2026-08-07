import { UserMenu } from "./UserMenu";

// prop drilling
// export const NavigationBar = ({ user }) => {
//     return (
//         <nav>
//             <h3>Navigation</h3>
//             <UserMenu user={user} />
//         </nav>
//     );
// };

// useContext API
export const NavigationBar = () => {
    return (
        <nav>
            <h3>Navigation</h3>
            <UserMenu />
        </nav>
    );
};
