import { Grid, GridItem } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import ChatTop from './ChatTop';
import ChatMessages from './ChatMessages';
import ChatBottom from './ChatBottom';
import SpinningLoader from '../UI/SpinningLoader';
import { useRooms } from '../../context/RoomsContext';
import { useMessages } from '../../context/MessagesContext';
import { useEffect, useState } from 'react';
import ListContainer from '../UI/ListContainer';

const getCurrRoom = (rooms, currId) => {
  let roomNeeded = null;

  for (let room of rooms) if (room.roomId === currId) roomNeeded = room;

  return roomNeeded;
};

const ChatPage = () => {
  const { rooms, isRoomsLoading } = useRooms();
  const { messages, areMessagesLoading } = useMessages();
  const { chatId } = useParams();

  const [currRoom, setCurrRoom] = useState(null);
  const [currRoomMessages, setCurrRoomMessages] = useState([]);

  useEffect(() => {
    if (isRoomsLoading || areMessagesLoading) return;
    setCurrRoom(getCurrRoom(rooms, chatId));
    setCurrRoomMessages(messages.get(chatId) || []);
  }, [rooms, chatId, messages, isRoomsLoading, areMessagesLoading]);

  if (!currRoom || !currRoomMessages) return <SpinningLoader />;

  if (rooms.length === 0) return <Navigate to={'/'} replace />;

  // const currRoom = rooms?.filter(room => room.roomId === chatId)[0];

  //console.log(currRoom, currRoomMessages);

  return (
    <Grid templateRows={'auto 1fr auto'} h={`${window.innerHeight}px`} gap={0}>
      <GridItem>
        <ChatTop title={currRoom.title} desc={currRoom.description} />
      </GridItem>
      <GridItem overflowY={'auto'} bg={'purple.50'}>
        <ChatMessages messages={currRoomMessages} />
      </GridItem>
      <GridItem>
        <ChatBottom roomId={currRoom.roomId} />
      </GridItem>
    </Grid>
  );
};
export default ChatPage;
