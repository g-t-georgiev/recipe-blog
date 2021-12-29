import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

function RouteGuard({ authenticated, children }) {
    const location = useLocation();
    const { user } = useAuthContext();

    if (!user.isLoggedIn && authenticated) {
        return <Navigate to="/users/login" replace={true} state={{ from: location.pathname }} />
    }

    if (user.isLoggedIn && !authenticated) {
        return <Navigate to="/" replace={true} />
    }

    return children;
}

export default RouteGuard;