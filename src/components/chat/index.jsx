import { Route, Routes } from 'react-router-dom';
import ChatPage from './ChatPage';
import EmptyChatPage from './EmptyChatPage';

const Chat = ({ isDesktop }) => {
  return (
    <Routes>
      <Route path="/chat/:chatId" element={<ChatPage />} />
      {isDesktop && <Route path="*" element={<EmptyChatPage />} />}
    </Routes>
  );
};

export default Chat;
