import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getUser } from '../../utility';
import { useGetUser } from '../../context/UserContext';
import ProfileAvatar from '../UI/ProfileAvatar';

const ChatItem = ({ message }) => {
  const [sentBy, setSentBy] = useState(null);
  const { senderId, messageText } = message;
  const { user } = useGetUser();

  useEffect(() => {
    const getSender = async () => {
      const curr = await getUser(senderId);
      setSentBy(curr.data());
    };

    getSender();
  }, [senderId]);

  if (!sentBy) return;

  const isCurrUser = user.uid === senderId;

  // console.log(sentBy);

  return (
    <Flex gap={2} flexDir={isCurrUser && 'row-reverse'} m={2}>
      <ProfileAvatar user={sentBy} />
      <Flex
        flexDir={'column'}
        bg={!isCurrUser ? 'pink.500' : 'twitter.500'}
        color={'white'}
        p={2}
        rounded={10}
      >
        <Text fontWeight={'bold'} fontSize={'xs'}>
          {sentBy.name}
        </Text>
        <Text>{messageText}</Text>
      </Flex>
    </Flex>
  );
};

export default ChatItem;
