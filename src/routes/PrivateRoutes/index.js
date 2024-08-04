import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const isAuthenticated = (token) => {
  return token !== null; // Modify this condition based on how you store the authentication token
};

const PrivateRoute = ({ path, element: Component }) => {
  const authToken = sessionStorage.getItem('authToken');
  const userDetails = useSelector((state) => state.userDetails.value);

  return isAuthenticated(authToken || userDetails.authToken) ? (
    <Route path={path} element={<Component />} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
