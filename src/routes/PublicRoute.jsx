import { Navigate } from 'react-router-dom';

import { useGetUser } from '../context/UserContext';
import SignIn from '../pages/SignIn';
import SpinningLoader from '../components/UI/SpinningLoader';

const PublicRoute = () => {
  const { user, isLoading } = useGetUser();

  if (isLoading) return <SpinningLoader />;

  if (user) return <Navigate to={'/'} />;

  return <SignIn />;
};
export default PublicRoute;
