import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

function RouteGuard({ isPrivate, children }) {
    const { user } = useAuthContext();

    if (isPrivate && !user.isLoggedIn) {
        return <Navigate to="/users/login" replace={true} />
    }

    if (!isPrivate && user.isLoggedIn) {
        return <Navigate to="/" replace={true} />
    }

    return children;
}

export default RouteGuard;