import {
  SimpleGrid,
  GridItem,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMatch } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Dashboard from '../components/Dashboard';
import TopSideBar from '../components/TopSideBar';
import RoomsList from '../components/rooms/RoomsList';
import Chat from '../components/chat';
import { useAlert } from '../hooks';

const Home = () => {
  const toast = useAlert();
  const [roomListHeight, setRoomListHeight] = useState(0);
  const disclosure = useDisclosure();
  const dashboardBtnRef = useRef();
  const topSideBarRef = useRef();
  const onSignOut = useCallback(() => {
    signOut(auth);
    disclosure.onClose();
    toast({
      status: 'info',
      title: 'Signed Out',
      description: 'The user was signed out successfully',
    });
  }, [disclosure, toast]);

  const match = useMatch('/chat/:chatId');
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const canRenderSideBar = isDesktop || !match;

  //console.log(rooms);

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
      <SimpleGrid columns={[1, 1, 1, 3]} h={`${window.innerHeight}px`}>
        {canRenderSideBar && (
          <GridItem maxH={'100%'}>
            <TopSideBar
              disclosure={disclosure}
              btnRef={dashboardBtnRef}
              barRef={topSideBarRef}
            />
            <RoomsList height={roomListHeight} />
          </GridItem>
        )}
        <GridItem colSpan={{ lg: 2 }}>
          <Chat isDesktop={isDesktop} />
        </GridItem>
      </SimpleGrid>
    </>
  );
};
export default Home;
