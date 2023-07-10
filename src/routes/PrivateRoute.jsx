import { Navigate } from 'react-router-dom';
import Home from '../pages/Home';

const PrivateRoute = () => {
    let profile = null;

    if (!profile) return <Navigate to="sign-in" replace />;

    return <Home />;
};
export default PrivateRoute;
