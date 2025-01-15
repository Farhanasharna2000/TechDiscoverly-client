import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import useRole from "../hooks/useRole"


const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <LoadingSpinner />
    if (role === 'Admin') return children
    return <Navigate to='/dashboard' replace='true' />
  }


export default AdminRoute;