import useAuthStore from '@/store/authStore'
import { Navigate } from 'react-router'


const RoleBasedPrivateRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, role } = useAuthStore()

    if (!isAuthenticated) {
        return <Navigate to="/auth/affiliate/login" />
    }

    if (requiredRole && requiredRole !== role) {
        return <Navigate to="/" /> // Redirect to home page or some other page if the user does not have the required role
    }

    return children

}

export default RoleBasedPrivateRoute
