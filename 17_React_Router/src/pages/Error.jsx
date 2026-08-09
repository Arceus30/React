import { useRouteError } from "react-router";

// This component is rendered by React Router when an error occurs in the route where "errorElement" is configured.
export const Error = () => {
    // useRouteError gives us information about the error that caused react Router to render this error page.
    const error = useRouteError();

    return (
        <div>
            <h1>Something went wrong</h1>
            {/* 
            error.statusText is commonly available for errors created by React Router, such as a 404 response.
            error.message is useful for JavaScript errors. We use optional chaining (?.) because the error object may not always contain these properties.
            */}
            <p>{error?.statusText || error?.message}</p>
        </div>
    );
};
