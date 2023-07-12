import { signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';

import { auth, googleProvider, db } from '../config/firebase';
import {
  SignInContainer,
  WelcomeTitle,
  GoogleSignInButton,
} from '../components/UI/SignInComponents';

const SignIn = () => {

    const toast = useToast();

  const googleSignIn = async () => {
    try {
      const authCred = await signInWithPopup(auth, googleProvider);
      toast({
        status: 'success',
        title: 'Success',
        description: 'The user was signed in successfully',
        duration: '5000',
        isClosable: true,
        variant: 'left-accent',
        position: 'top-right'
      })
      const isNewUser = getAdditionalUserInfo(authCred).isNewUser;

      if (isNewUser) {
        await setDoc(doc(db, 'users', `${auth.currentUser.uid}`), {
          name: auth.currentUser.displayName,
          createdAt: serverTimestamp(),
        });
        console.log('New user created!');
      }
    } catch (err) {
        toast({
            status: 'error',
            title: 'Error',
            description: err.message,
            duration: '5000',
            isClosable: true,
            variant: 'left-accent',
            position: 'top-right'
          })
    }
  };

  return (
    <SignInContainer>
      <WelcomeTitle />
      <GoogleSignInButton onClick={googleSignIn} />
    </SignInContainer>
  );
};
export default SignIn;
