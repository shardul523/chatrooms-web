import { Flex, Heading } from '@chakra-ui/react';

const EmptyChatPage = () => (
  <Flex w={'100%'} h={'100vh'} justify={'center'} alignItems={'center'}>
    <Heading as={'p'} color={'blackAlpha.500'}>
      Please select a chat
    </Heading>
  </Flex>
);
export default EmptyChatPage;
