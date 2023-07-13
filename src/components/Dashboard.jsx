import {
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  DrawerContent,
  DrawerBody,
  Heading,
  DrawerFooter,
  Button,
} from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
import { useGetUser } from '../context/UserContext';

const Dashboard = ({ disclosure, finalFocusRef, onSignOut }) => {
  const { user } = useGetUser();
  const { isOpen, onClose } = disclosure;

  return (
    <Drawer
      finalFocusRef={finalFocusRef}
      isOpen={isOpen}
      onClose={onClose}
      placement={'left'}
      size={{ sm: 'full', md: 'sm' }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Dashboard</DrawerHeader>
        <DrawerBody>
          <Heading size={'lg'}>Hey {user.name}</Heading>
        </DrawerBody>
        <DrawerFooter>
          <Button
            colorScheme="red"
            w={'100%'}
            leftIcon={<MdLogout />}
            onClick={onSignOut}
          >
            Sign Out
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default Dashboard;
