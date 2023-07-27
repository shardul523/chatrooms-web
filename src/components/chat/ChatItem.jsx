import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getUser } from '../../utility';
import ProfileAvatar from '../UI/ProfileAvatar'

const ChatItem = ({ message }) => {
  const [sentBy, setSentBy] = useState(null);
  const { senderId, messageText } = message;

  useEffect(() => {
    const getSender = async () => {
      const curr = await getUser(senderId);
      setSentBy(curr.data());
    };

    getSender();
  }, [senderId]);

  if (!sentBy) return;

  console.log(sentBy);

  return <Box><ProfileAvatar user={sentBy} /> {messageText}</Box>;
};

export default ChatItem;
