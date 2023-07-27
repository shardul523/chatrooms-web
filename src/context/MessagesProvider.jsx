import { useEffect, useState } from 'react';

import { MessagesContext } from './MessagesContext';
import { useRooms } from './RoomsContext';
import { getRoomMessages, getDataFromSnap } from '../utility';

const MessagesProvider = ({ children }) => {
  const { rooms, isRoomsLoading } = useRooms();
  const [messages, setMessages] = useState(null);
  const [areMessagesLoading, setAreMessagesLoading] = useState(true);

  useEffect(() => {
    setAreMessagesLoading(true);
    if (isRoomsLoading) return;

    if (rooms.length === 0) {
      setAreMessagesLoading(false);
      return;
    }

    const roomIds = rooms.map(room => room.roomId);

    const messagesMap = new Map();

    const callGetRoomMessages = async () => {
      await roomIds.forEach(async rid => {
        const currMessages = [];
        const currMessagesSnap = await getRoomMessages(rid);
        currMessagesSnap.forEach(docSnap => {
          currMessages.push(getDataFromSnap(docSnap));
        });
        messagesMap.set(rid, currMessages);
      });

      setMessages(messagesMap);

      setAreMessagesLoading(false);
    };

    callGetRoomMessages();
  }, [rooms, isRoomsLoading]);

  return (
    <MessagesContext.Provider value={{ messages, areMessagesLoading }}>
      {children}
    </MessagesContext.Provider>
  );
};
export default MessagesProvider;
