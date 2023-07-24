import { Flex, Heading, Text } from '@chakra-ui/react';
import TimeAgo from 'timeago-react';

const RoomsListItem = ({ data, active }) => {
  const { title, createdAt } = data;
  // console.log(createdAt)
  // console.log(data)

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
        <Heading as={'h3'} fontSize={'1.25rem'}>
          {title}
        </Heading>
        <TimeAgo datetime={createdAt.toDate()} />
      </Flex>
      <Flex align={'center'}>
        <Text>No messages yet...</Text>
      </Flex>
    </Flex>
  );
};
export default RoomsListItem;
