import { Flex, Heading, Text } from '@chakra-ui/react';
import TimeAgo from 'timeago-react';
import { useEffect, useState } from 'react';
import { getDoc } from 'firebase/firestore';

const RoomsListItem = ({ data, active }) => {
  const [title, setTitle] = useState('Not available');
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [lastMessage, setLastMessage] = useState('No messages yet...');
  //console.log(lastMessage);

  useEffect(() => {
    const getMessage = async () => {
      const lastMessageSnap = await getDoc(data.lastMessageRef);
      if (!lastMessageSnap) return;
      setLastMessage(lastMessageSnap.data().messageText);
    };

    getMessage();
    if (data.title) setTitle(data.title);
    if (data.updatedAt) setUpdatedAt(data.updatedAt.toDate());
  }, [data]);

  return (
    <Flex
      p={'2'}
      flexDir={'column'}
      gap={'4'}
      _hover={{ background: 'purple.50' }}
      borderLeft={active && '5px solid'}
      borderColor={'purple.500'}
      bg={active && 'purple.50'}
    >
      <Flex justifyContent={'space-between'} align={'center'}>
        <Heading
          as={'h3'}
          fontSize={'1.25rem'}
          fontWeight={'normal'}
          color={active && 'purple.800'}
        >
          {title}
        </Heading>
        <Text color={'blackAlpha.500'}>
          <TimeAgo datetime={updatedAt} />
        </Text>
      </Flex>
      <Flex align={'center'}>
        <Text color={'blackAlpha.500'}>{`${lastMessage.slice(0, 50)}${
          lastMessage.length > 50 ? '.....' : ''
        }`}</Text>
      </Flex>
    </Flex>
  );
};
export default RoomsListItem;
