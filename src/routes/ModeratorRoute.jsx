
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import useRole from '../hooks/useRole';

const ModeratorRoute = ({children}) => {
    const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'Moderator') return children
  return <Navigate to='/dashboard' replace='true' />
}

export default ModeratorRoute;