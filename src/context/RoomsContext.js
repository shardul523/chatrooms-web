import { createContext, useContext } from 'react';

export const RoomsContext = createContext();

export const useRooms = () => useContext(RoomsContext);
