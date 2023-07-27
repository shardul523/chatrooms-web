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
  getDoc,
  orderBy,
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

export const getUser = async userId => {
  const userDocRef = doc(db, 'users', userId);
  const userDocSnap = await getDoc(userDocRef);

  return userDocSnap;
};

export const getRoomMessagesSnap = async roomId => {
  const messagesCollectionRef = collection(db, 'rooms', roomId, 'messages');
  const messagesQuery = query(messagesCollectionRef, orderBy('sentAt', 'desc'));
  const allMessagesSnap = await getDocs(messagesQuery);
  // console.log(allMessagesSnap);
  return allMessagesSnap;
};

export const getDataFromSnap = snap => {
  if (snap.empty) return null;
  const data = snap.data();
  data.id = snap.id;
  return data;
};
