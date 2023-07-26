import { Box, Button, Divider, Flex, AbsoluteCenter } from '@chakra-ui/react';
import { RxDashboard } from 'react-icons/rx';

import CreateChatRoom from './dashboard/CreateChatRoom';
import JoinChatRoom from './dashboard/JoinChatRoom';

const TopSideBar = ({ disclosure, btnRef, barRef }) => {
  return (
    <Flex flexDir={'column'} gap={2} m={2} ref={barRef}>
      <Button
        leftIcon={<RxDashboard />}
        colorScheme="purple"
        w={'100%'}
        onClick={() => disclosure.onOpen()}
        ref={btnRef}
      >
        Dashboard
      </Button>
      <Flex justify={'space-between'}>
        <CreateChatRoom />
        <JoinChatRoom />
      </Flex>
      <Box position="relative" py={10}>
        <Divider color={'black'} opacity={0.8} />
        <AbsoluteCenter px="5" bg={'white'}>
          Join Conversation
        </AbsoluteCenter>
      </Box>
    </Flex>
  );
};
export default TopSideBar;
