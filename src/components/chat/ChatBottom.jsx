import { Flex, IconButton } from '@chakra-ui/react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useRef } from 'react';

import ChatInput from './ChatInput';
import { useGetUser } from '../../context/UserContext';
import { addNewChat } from '../../utility';

const ChatBottom = ({ roomId }) => {
  const chatInputRef = useRef();
  const { user } = useGetUser();

  const sendMessage = async () => {
    const msgText = chatInputRef.current.innerText;
    const newChat = {
      messageText: msgText,
      senderId: user.uid,
      sentAt: new Date(),
    };

    addNewChat(roomId, newChat);

    chatInputRef.current.innerText = '';
  };

  return (
    <Flex justify={'center'} gap={10} py={5}>
      <ChatInput chatRef={chatInputRef} />
      <IconButton
        icon={<RiSendPlaneFill />}
        size={'lg'}
        rounded={100}
        colorScheme="purple"
        onClick={sendMessage}
      />
    </Flex>
  );
};
export default ChatBottom;
