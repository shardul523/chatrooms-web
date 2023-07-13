import { Spinner, Flex, Text } from '@chakra-ui/react';

const SpinningLoader = () => (
  <Flex
    justifyContent={'center'}
    alignItems={'center'}
    h={'100vh'}
    flexDir={'column'}
  >
    <Spinner
      thickness="6px"
      speed="0.65s"
      emptyColor="gray.200"
      color="purple.500"
      size="xl"
    />
    <Text>Loading</Text>
  </Flex>
);
export default SpinningLoader;
