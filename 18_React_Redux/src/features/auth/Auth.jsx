import { useSelector, useDispatch } from "react-redux";
import { loginUser, logout } from "./authSlice.js";
import {
    selectUser,
    selectIsAuthenticated,
    selectAuthLoading,
    selectAuthError,
} from "./authSelectors.js";

function Auth() {
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const dispatch = useDispatch();
    function handleLogin() {
        const user = {
            email: "john@example.com",
            password: "1234",
        };
        dispatch(loginUser(user));
    }

    function handleLogout() {
        dispatch(logout());
    }

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <h2>Welcome {user.name}</h2>

                    <p>{user.email}</p>

                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <h2>You are logged out</h2>

                    <h2>Login</h2>

                    <button onClick={handleLogin} disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {error && <p>{error}</p>}
                </>
            )}
        </div>
    );
}

export default Auth;
