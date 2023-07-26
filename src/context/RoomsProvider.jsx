import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

import { RoomsContext } from './RoomsContext';
import { useGetUser } from './UserContext';

const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useGetUser();

  useEffect(() => {
    const userRooms = user?.rooms || [];

    if (userRooms.length === 0) return;

    const userRoomsQuery = query(
      collection(db, 'rooms'),
      where('__name__', 'in', userRooms),
    );
    const roomsDocsUnsub = onSnapshot(userRoomsQuery, querySnap => {
      const roomsData = [];
      querySnap.forEach(doc => {
        const currRoom = doc.data();
        currRoom.roomId = doc.id;

        roomsData.push(currRoom);
      });

      setRooms(roomsData);
      setIsLoading(true);
    });

    return () => roomsDocsUnsub();
  }, [user]);

  return (
    <RoomsContext.Provider value={{ rooms, isLoading }}>
      {children}
    </RoomsContext.Provider>
  );
};
export default RoomsProvider;
