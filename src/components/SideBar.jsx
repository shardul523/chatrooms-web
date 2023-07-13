import { Box, Button } from '@chakra-ui/react';
import { RxDashboard } from 'react-icons/rx';

const SideBar = ({ disclosure, btnRef }) => {
  return (
    <Box>
      <Button
        leftIcon={<RxDashboard />}
        colorScheme="purple"
        w={'100%'}
        rounded={0}
        onClick={() => disclosure.onOpen()}
        ref={btnRef}
      >
        Dashboard
      </Button>
    </Box>
  );
};
export default SideBar;
