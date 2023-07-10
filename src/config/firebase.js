import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: 'chatrooms-web.firebaseapp.com',
    projectId: 'chatrooms-web',
    storageBucket: 'chatrooms-web.appspot.com',
    messagingSenderId: '304210113728',
    appId: '1:304210113728:web:2378c5badf2414225d6925',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
