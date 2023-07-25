import { Box, Flex, Divider, Spinner, Link } from '@chakra-ui/react';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import RoomsListItem from './RoomsListItem';
import { useGetUser } from '../../context/UserContext';
import { db } from '../../config/firebase';

const getRoomsData = async rooms => {
  const snapData = [];
  const getRoomsQuery = query(
    collection(db, 'rooms'),
    where('__name__', 'in', rooms),
  );
  const getRoomsQuerySnapshot = await getDocs(getRoomsQuery);
  getRoomsQuerySnapshot.forEach(doc => snapData.push(doc));

  return snapData;
};

const RoomsList = ({ height }) => {
  const { user } = useGetUser();
  const [roomsData, setRoomsData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const setSnapData = async () => {
      if (!user.rooms) {
        setRoomsData([]);
        return;
      }
      const snapData = await getRoomsData(user.rooms);
      setRoomsData(snapData);
    };

    setSnapData();
  }, [user]);

  //console.log(roomsData);

  if (roomsData)
    return (
      <Box
        h={height}
        as="nav"
        overflowY={'scroll'}
        sx={{
          '&::-webkit-scrollbar': {
            width: '7.5px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '10px',
          },
        }}
      >
        {roomsData.map((roomData, index) => {
          const isActive = `/chat/${roomData.id}` === location.pathname;
          return (
            <Link
              as={RouterLink}
              to={`/chat/${roomData.id}`}
              key={index}
              cursor={'pointer'}
              _hover={{ textDecor: 'none' }}
            >
              <RoomsListItem data={roomData.data()} active={isActive} />
              <Divider />
            </Link>
          );
        })}
      </Box>
    );

  return (
    <Flex justify={'center'} align={'center'} h={height}>
      <Spinner color="purple" />
    </Flex>
  );
};
export default RoomsList;
