import {
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
  Divider,
} from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
import { useGetUser } from '../context/UserContext';
import UploadAvatar from './UI/UploadAvatar';
import MutableInput from './UI/MutableInput';

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
        <DrawerHeader>
          <Text>Dashboard</Text>
        </DrawerHeader>
        <DrawerBody>
          <Divider mb={5} />
          <MutableInput name={user.name} />
          <UploadAvatar />
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
