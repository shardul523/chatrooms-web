import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute />} />
            <Route path="/sign-in" element={<PublicRoute />} />
        </Routes>
    );
};

export default App;
