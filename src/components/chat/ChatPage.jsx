import { Box } from '@chakra-ui/react';
import ChatTop from './ChatTop';
import ChatMessages from './ChatMessages';
import ChatBottom from './ChatBottom';

const ChatPage = () => {
  return (
    <Box>
      <ChatTop />
      <ChatMessages />
      <ChatBottom />
    </Box>
  );
};
export default ChatPage;
