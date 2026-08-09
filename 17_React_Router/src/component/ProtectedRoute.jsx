import { Navigate } from "react-router";
import { useNavigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
    const isLoggedIn = false;
    const navigate = useNavigate();
    if (!isLoggedIn) {
        console.log("This is a protected route");
        return <Navigate to="/" replace />;
        // or
        navigate("/", { replace: true });
    }
    return children;
};
