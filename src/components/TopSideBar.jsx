import { Box, Button, Divider, Flex, AbsoluteCenter } from '@chakra-ui/react';
import { RxDashboard } from 'react-icons/rx';

import CreateChatRoom from './dashboard/CreateChatRoom';

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
      <CreateChatRoom />
      <Box position="relative" py={10}>
        <Divider color={'black'} opacity={1} />
        <AbsoluteCenter px="4">Join Conversation</AbsoluteCenter>
      </Box>
    </Flex>
  );
};
export default TopSideBar;
