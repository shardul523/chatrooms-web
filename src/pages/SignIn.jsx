import { Container, Heading, Text, Box, Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

const SignIn = () => {
    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log('User Signed In');
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Container
            display="flex"
            flexDirection="column"
            justifyContent="center"
            h="50vh"
            gap="40px"
        >
            <Box>
                <Heading as="h1" textAlign="center">
                    Welcome to ChatRooms
                </Heading>
                <Text align="center">Progressive chat app for neophytes</Text>
            </Box>
            <Box>
                <Button
                    leftIcon={<FcGoogle />}
                    colorScheme="blue"
                    variant="outline"
                    w="100%"
                    onClick={googleSignIn}
                >
                    Sign In With Google
                </Button>
            </Box>
        </Container>
    );
};
export default SignIn;
