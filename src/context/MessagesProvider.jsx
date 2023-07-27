import { useEffect, useState } from 'react';

import { MessagesContext } from './MessagesContext';
import { useRooms } from './RoomsContext';
import { getRoomMessagesSnap, getDataFromSnap } from '../utility';

const MessagesProvider = ({ children }) => {
  const { rooms, isRoomsLoading } = useRooms();
  const [messages, setMessages] = useState(null);
  const [areMessagesLoading, setAreMessagesLoading] = useState(true);

  const messagesFromRooms = async rids => {
    const allMessageSnaps = await Promise.all(
      rids.map(rid => getRoomMessagesSnap(rid)),
    );
    const messageMap = new Map();

    for (let i = 0; i < rids.length; i++) {
      const currMessages = [];
      allMessageSnaps[i].forEach(querySnap =>
        currMessages.push(getDataFromSnap(querySnap)),
      );

      messageMap.set(rids[i], currMessages);
    }

    setMessages(messageMap);
    setAreMessagesLoading(false);
  };

  useEffect(() => {
    setAreMessagesLoading(true);

    if (isRoomsLoading) return;

    if (rooms.length === 0) {
      return;
    }

    const roomIds = rooms.map(room => room.roomId);

    messagesFromRooms(roomIds);
  }, [rooms, isRoomsLoading]);

  return (
    <MessagesContext.Provider value={{ messages, areMessagesLoading }}>
      {children}
    </MessagesContext.Provider>
  );
};
export default MessagesProvider;
