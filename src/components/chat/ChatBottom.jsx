import { Flex, IconButton } from '@chakra-ui/react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useRef } from 'react';

import ChatInput from './ChatInput';
import { db } from '../../config/firebase';
import { useGetUser } from '../../context/UserContext';

const ChatBottom = () => {
  const chatInputRef = useRef();
  const { user } = useGetUser();

  const sendMessage = () => {
    const msgText = chatInputRef.current.innerText;
    const newChat = {
      msgText,
      senderId: user.uid,
      sentAt: serverTimestamp(),
    };

    console.log(newChat);
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
