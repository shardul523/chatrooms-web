import { Flex, Divider, Spinner } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import RoomsListItem from './RoomsListItem';
import ListContainer from '../UI/ListContainer';
import { useRooms } from '../../context/RoomsContext';
import Anchor from '../Anchor';

const RoomsList = ({ height }) => {
  const location = useLocation();
  const { rooms, isLoading } = useRooms();

  if (!isLoading)
    return (
      <ListContainer height={height}>
        {rooms.map((roomData, index) => {
          const isActive = `/chat/${roomData.roomId}` === location.pathname;
          return (
            <Anchor to={`/chat/${roomData.roomId}`} key={index}>
              <RoomsListItem data={roomData} active={isActive} />
              <Divider />
            </Anchor>
          );
        })}
      </ListContainer>
    );

  return (
    <Flex justify={'center'} align={'center'} h={height}>
      <Spinner color="purple" />
    </Flex>
  );
};
export default RoomsList;
