import { use, useContext } from "react";
import { UserContext } from "./UserContext";

// prop drilling
// export const Avatar = ({ user }) => {
//     return <div>Welcome {user.name}</div>;
// };

// useContext
// export const Avatar = () => {
//     const user = useContext(UserContext);
//     return <div>Welcome {user.name}</div>;
// };

// useContext + useState
// export const Avatar = () => {
//     const { user, setUser } = useContext(UserContext);
//     const handleChange = (e) => {
//         setUser({ ...user, name: e.target.value });
//     };
//     return (
//         <div>
//             <input type="text" value={user.name} onChange={handleChange} />
//             <h5>Welcome {user.name}</h5>
//         </div>
//     );
// };

// use instead of useContext
// use is not a hook whereas useContext is a hook
export const Avatar = ({ isLoading = true }) => {
    if (isLoading) {
        return <div>Loading the data</div>;
    }

    // this line will not throw any error as use is not a hook and hook rules do not apply on use
    const { user, setUser } = use(UserContext);

    // Below line will throw an error as the above if condition will return early in some cases (breaking the rules of hooks)
    // const { user, setUser } = useContext(UserContext);

    const handleChange = (e) => {
        setUser({ ...user, name: e.target.value });
    };
    return (
        <div>
            <input type="text" value={user.name} onChange={handleChange} />
            <h5>Welcome {user.name}</h5>
        </div>
    );
};
