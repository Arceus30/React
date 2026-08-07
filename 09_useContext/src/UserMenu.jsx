import { Avatar } from "./Avatar";

// prop drilling
// export const UserMenu = ({ user }) => {
//     return (
//         <div>
//             <h4>User Menu</h4>
//             <Avatar user={user} />
//         </div>
//     );
// };

// useContext API
export const UserMenu = () => {
    return (
        <div>
            <h4>User Menu</h4>
            <Avatar />
        </div>
    );
};
