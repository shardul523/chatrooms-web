import { Box, Button, Flex } from '@chakra-ui/react';
import { RxDashboard } from 'react-icons/rx';

import CreateChatRoom from './dashboard/CreateChatRoom';

const SideBar = ({ disclosure, btnRef }) => {
  return (
    <Flex flexDir={'column'} gap={2} m={2}>
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
    </Flex>
  );
};
export default SideBar;
