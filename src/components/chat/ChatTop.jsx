import { Card, CardBody, Flex, IconButton, Heading } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

const ChatTop = () => {
  return (
    <Card>
      <CardBody>
        <Flex w={'100%'} justify={'space-between'} alignItems={'center'}>
          <Flex>
            <IconButton icon={<BiArrowBack />} />
            <Heading>Room Name</Heading>
          </Flex>

          <IconButton icon={<BsThreeDotsVertical />} />
        </Flex>
      </CardBody>
    </Card>
  );
};
export default ChatTop;
