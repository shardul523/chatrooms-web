import { Navigate } from 'react-router-dom';

import { useGetUser } from '../context/UserContext';
import SpinningLoader from '../components/UI/SpinningLoader';
import Home from '../pages/Home';

const PrivateRoute = () => {
  let { user, isLoading } = useGetUser();

  if (isLoading) return <SpinningLoader />;

  if (!user) return <Navigate to="sign-in" replace />;

  return <Home />;
};
export default PrivateRoute;
