import { Box } from '@chakra-ui/react';
import ChatItem from './ChatItem';

const ChatMessages = ({ messages }) => {
  return (
    <Box>
      {messages.map(message => (
        <ChatItem key={message.id} message={message} />
      ))}
    </Box>
  );
};
export default ChatMessages;
