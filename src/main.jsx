import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import UserProvider from './context/UserProvider.jsx';
import RoomsProvider from './context/RoomsProvider.jsx';
import MessagesProvider from './context/MessagesProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <UserProvider>
          <RoomsProvider>
            <MessagesProvider>
              <App />
            </MessagesProvider>
          </RoomsProvider>
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
