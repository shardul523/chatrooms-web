import {
  SimpleGrid,
  GridItem,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Dashboard from '../components/Dashboard';
import TopSideBar from '../components/TopSideBar';
import RoomsList from '../components/rooms/RoomsList';
import { useCallback, useEffect, useRef, useState } from 'react';

const Home = () => {
  const toast = useToast();
  const [roomListHeight, setRoomListHeight] = useState(0);
  const disclosure = useDisclosure();
  const dashboardBtnRef = useRef();
  const topSideBarRef = useRef();
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
  }, [disclosure, toast]);

  useEffect(() => {
    const topSideBarHeight = topSideBarRef.current?.scrollHeight;
    setRoomListHeight(`calc(100vh - ${topSideBarHeight + 16}px)`);
  }, [topSideBarRef]);

  return (
    <>
      <Dashboard
        disclosure={disclosure}
        finalFocusRef={dashboardBtnRef}
        onSignOut={onSignOut}
      />
      <SimpleGrid columns={[1, 1, 1, 3]} maxH={'100vh'} overflow={'hidden'}>
        <GridItem>
          <TopSideBar
            disclosure={disclosure}
            btnRef={dashboardBtnRef}
            barRef={topSideBarRef}
          />
          <RoomsList height={roomListHeight} />
        </GridItem>
        <GridItem colSpan={{ md: 2, lg: 3 }}></GridItem>
      </SimpleGrid>
    </>
  );
};
export default Home;
