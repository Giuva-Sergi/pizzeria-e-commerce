import { useSelector } from "react-redux"
import { getAuthenticationStatus } from "../user/userSlice"
import { Navigate } from "react-router-dom"

function PrivateRoute({children}) {
    const isAuthenticated = useSelector(getAuthenticationStatus);
    return isAuthenticated ? children : <Navigate to="/" />
}

export default PrivateRoute
