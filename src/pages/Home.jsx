import {
  SimpleGrid,
  GridItem,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Dashboard from '../components/Dashboard';
import SideBar from '../components/SideBar';
import { useCallback, useRef } from 'react';

const Home = () => {
  const toast = useToast();
  const disclosure = useDisclosure();
  const dashboardBtnRef = useRef();
  const onSignOut = useCallback(() => {
    signOut(auth);
    disclosure.onClose();
    toast({
      status: 'info',
      variant: 'left-accent',
      position: 'top-right',
      title: 'Signed Out',
      description: 'The user was signed out successfully',
      duration: '5000',
      isClosable: true,
    });
  });

  return (
    <SimpleGrid columns={[1, null, 3]}>
      <GridItem>
        <SideBar disclosure={disclosure} btnRef={dashboardBtnRef} />
      </GridItem>
      <GridItem colSpan={2}>
        <Dashboard
          disclosure={disclosure}
          finalFocusRef={dashboardBtnRef}
          onSignOut={onSignOut}
        />
      </GridItem>
    </SimpleGrid>
  );
};
export default Home;
