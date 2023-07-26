import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

const roomsCollectionRef = collection(db, 'rooms');

export const roomsWithJoinId = async id => {
  const joinIdQuery = query(roomsCollectionRef, where('joinId', '==', id));
  const queryResult = await getDocs(joinIdQuery);

  return queryResult;
};

export const joinRoom = async (roomId, memberId) => {
  const roomDocRef = doc(db, 'rooms', roomId);
  const userDocRef = doc(db, 'users', memberId);

  await updateDoc(roomDocRef, {
    members: arrayUnion(memberId),
  });

  await updateDoc(userDocRef, {
    rooms: arrayUnion(roomId),
  });
};

export const addNewRoom = async (creatorId, roomData) => {
  const userDocRef = doc(db, 'users', creatorId);
  const newRoomRef = await addDoc(roomsCollectionRef, roomData);
  await updateDoc(userDocRef, {
    rooms: arrayUnion(newRoomRef.id),
  });
};

export const addNewChat = async (roomId, chatData) => {
  const roomDocRef = doc(db, 'rooms', roomId);
  const messagesCollectionRef = collection(db, 'rooms', roomId, 'messages');
  const newChatRef = await addDoc(messagesCollectionRef, chatData);
  await updateDoc(roomDocRef, {
    updatedAt: serverTimestamp(),
    lastMessageRef: newChatRef,
  });
};
