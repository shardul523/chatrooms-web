import { Navigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';

const PrivateRoute = () => {
    let profile = false;

    if (profile) return <Navigate to="/" replace />;

    return <SignIn />;
};
export default PrivateRoute;
