import { createContext, useContext } from 'react';

export const MessagesContext = createContext();

export const useMessages = () => useContext(MessagesContext);
