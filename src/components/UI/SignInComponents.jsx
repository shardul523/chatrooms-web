import { Container, Box, Text, Heading, Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

export const SignInContainer = ({ children }) => (
  <Container
    display="flex"
    flexDirection="column"
    justifyContent="center"
    h="50vh"
    gap="40px"
  >
    {children}
  </Container>
);

export const WelcomeTitle = () => (
  <Box>
    <Heading as="h1" textAlign="center">
      Welcome to ChatRooms
    </Heading>
    <Text align="center">Progressive chat app for neophytes</Text>
  </Box>
);

export const GoogleSignInButton = ({ onClick }) => (
  <Box>
    <Button
      leftIcon={<FcGoogle />}
      colorScheme="purple"
      variant="outline"
      w="100%"
      onClick={onClick}
    >
      Sign In With Google
    </Button>
  </Box>
);
