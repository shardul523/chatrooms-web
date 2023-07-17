import { Box, Button, Flex } from '@chakra-ui/react';
import { RxDashboard } from 'react-icons/rx';
import { IoMdCreate } from 'react-icons/io';

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
      <Button leftIcon={<IoMdCreate />} colorScheme="whatsapp" w={'100%'}>
        Create New Chatroom
      </Button>
    </Flex>
  );
};
export default SideBar;
