import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

import { RoomsContext } from './RoomsContext';
import { useGetUser } from './UserContext';

const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
  const [isRoomsLoading, setisRoomsLoading] = useState(true);
  const { user } = useGetUser();

  useEffect(() => {
    if (!user) return;
    const userRooms = user.rooms || [];

    if (user && userRooms.length == 0) {
      setisRoomsLoading(false);
      setRooms(userRooms);
      return;
    }

    const userRoomsQuery = query(
      collection(db, 'rooms'),
      where('__name__', 'in', userRooms),
    );
    const roomsDocsUnsub = onSnapshot(userRoomsQuery, querySnap => {
      setisRoomsLoading(true);
      const roomsData = [];
      querySnap.forEach(doc => {
        const currRoom = doc.data();
        currRoom.roomId = doc.id;

        roomsData.push(currRoom);
      });

      setRooms(roomsData);
      setisRoomsLoading(false);
    });

    return () => roomsDocsUnsub();
  }, [user]);

  return (
    <RoomsContext.Provider value={{ rooms, isRoomsLoading }}>
      {children}
    </RoomsContext.Provider>
  );
};
export default RoomsProvider;
