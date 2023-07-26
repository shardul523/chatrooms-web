import { Flex, Heading, Text } from '@chakra-ui/react';
import TimeAgo from 'timeago-react';
import { useEffect, useState } from 'react';
import { getDoc } from 'firebase/firestore';

const RoomsListItem = ({ data, active }) => {
  const { title, createdAt } = data;
  const [lastMessage, setLastMessage] = useState('No messages yet...');
  console.log(lastMessage);

  useEffect(() => {
    const getMessage = async () => {
      const lastMessageSnap = await getDoc(data.lastMessageRef);
      if (!lastMessageSnap) return;
      setLastMessage(lastMessageSnap.data().messageText);
    };

    getMessage();
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
          <TimeAgo datetime={createdAt.toDate()} />
        </Text>
      </Flex>
      <Flex align={'center'}>
        <Text color={'blackAlpha.500'}>{lastMessage.slice(0, 30)}</Text>
      </Flex>
    </Flex>
  );
};
export default RoomsListItem;
