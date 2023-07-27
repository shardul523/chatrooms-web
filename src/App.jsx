import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<PublicRoute />} />
      <Route path="*" element={<PrivateRoute />} />
    </Routes>
  );
};

export default App;
