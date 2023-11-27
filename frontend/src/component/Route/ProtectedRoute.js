import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WithAuth = (Component, isAdmin) => {
  const ProtectedComponent = (props) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    
    // Your authentication and authorization logic
    const isUserAdmin = user?.role === 'admin';

    if (loading) {
      return null; // Handle loading state if needed
    }

    if (!isAuthenticated || (isAdmin && !isUserAdmin)) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

  return ProtectedComponent;
};

export default WithAuth;
