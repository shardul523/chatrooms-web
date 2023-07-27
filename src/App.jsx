import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { useMessages } from './context/MessagesContext';

const App = () => {
  const { messages, areMessagesLoading } = useMessages();

  console.log(messages, areMessagesLoading);
  return (
    <Routes>
      <Route path="/sign-in" element={<PublicRoute />} />
      <Route path="*" element={<PrivateRoute />} />
    </Routes>
  );
};

export default App;
