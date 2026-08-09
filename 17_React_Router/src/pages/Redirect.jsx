import { Navigate } from "react-router";

export const Redirect = () => {
    // Navigate performs a programmatic redirect by telling React Router to change the current URL to the route specified by the "to" prop.
    // "replace" prevents the old URL from being added to the browser history. This means clicking the browser's Back button will not take the user back to the redirected route.
    return <Navigate to="/" replace />;
};
