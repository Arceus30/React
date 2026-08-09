import { Link } from "react-router";

export const NotFound = () => {
    return (
        <div>
            <h1>Not Found</h1>
            <p>Error 404: Not Found</p>
            <Link to="/">Go To Home</Link>
        </div>
    );
};
