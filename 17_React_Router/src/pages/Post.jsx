import { useParams, useSearchParams, useLocation } from "react-router";
export const Post = () => {
    // useParams reads dynamic values from the URL path. For a route like "/123", where the route is defined as ":postId", postId will contain the string "123".
    const { postId } = useParams();

    // useSearchParams reads and updates query-string parameters.
    // For example, in "/123?profile=admin", searchParams.get("profile") returns "admin".
    // The second value is a function used to update the query parameters.
    const [searchParams, setSearchParams] = useSearchParams();
    const profile = searchParams.get("profile");

    // useLocation gives information about the current URL/location such as pathname, search, hash, and navigation state.
    const location = useLocation();

    return (
        <div>
            <h1>Post</h1>
            {postId && <h2>UserID (useParams): {postId}</h2>}
            {profile && <h2>Profile (useSearchParams): {profile}</h2>}
            {location && (
                <p>Location (useLocation): {JSON.stringify(location)}</p>
            )}
        </div>
    );
};
