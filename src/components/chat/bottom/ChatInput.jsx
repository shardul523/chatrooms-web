import { Text } from '@chakra-ui/react';

const ChatInput = ({ chatRef }) => {
  return (
    <Text
      contentEditable
      w={'80%'}
      p={2}
      boxShadow={'sm'}
      roundedLeft={10}
      roundedRight={10}
      outline={'none'}
      bg={'gray.50'}
      _focus={{ border: '2px solid', borderColor: 'purple.500' }}
      ref={chatRef}
    />
  );
};
export default ChatInput;
