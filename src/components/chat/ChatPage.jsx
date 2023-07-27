import { Grid, GridItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ChatTop from './ChatTop';
import ChatMessages from './ChatMessages';
import ChatBottom from './ChatBottom';
import SpinningLoader from '../UI/SpinningLoader';
import { useRooms } from '../../context/RoomsContext';

const ChatPage = () => {
  const { rooms, isLoading } = useRooms();
  const { chatId } = useParams();

  if (isLoading) return <SpinningLoader />;

  const currRoom = rooms?.filter(room => room.roomId === chatId)[0];
  console.log(currRoom);
  return (
    <Grid templateRows={'auto 1fr auto'} height={'100vh'}>
      <GridItem>
        <ChatTop title={currRoom.title} desc={currRoom.description} />
      </GridItem>
      <GridItem>
        <ChatMessages messages={currRoom.roomId} />
      </GridItem>
      <GridItem>
        <ChatBottom roomId={currRoom.roomId} />
      </GridItem>
    </Grid>
  );
};
export default ChatPage;
