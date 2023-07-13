import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import { auth, db } from '../config/firebase';
import { UserContext } from './UserContext';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userDocUnsub = null;

    const authUnsub = onAuthStateChanged(auth, userAuth => {
      if (!userAuth) {
        if (userDocUnsub) userDocUnsub();

        setUser(null);
        setIsLoading(false);
        return;
      }

      userDocUnsub = onSnapshot(doc(db, 'users', `${userAuth.uid}`), snap => {
        const userData = {
          ...snap.data(),
          email: userAuth.email,
          uid: userAuth.uid,
        };

        setUser(userData);
        setIsLoading(false);
      });
    });

    return () => authUnsub();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
