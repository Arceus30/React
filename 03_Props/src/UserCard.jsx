import { UserInfo } from "./UserInfo";

// props forwarded using spread operator(...)
export const UserCard = ({ id, ...rest }) => {
    return (
        <>
            <h1>User details: {id}</h1>
            <UserInfo {...rest} />
        </>
    );
};
