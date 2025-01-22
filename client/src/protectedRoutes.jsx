import { Navigate } from "react-router-dom";
import { useAuth } from "./lib/checkJWTtoken";


export const AuthRoute = ({ children }) => {
    const isAuthenticated = useAuth();
    return isAuthenticated? <Navigate to="/" replace />:children

}

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? children : (<Navigate to="/signin" replace/>)
}