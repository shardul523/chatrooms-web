import { Flex, IconButton, Heading, Card, CardBody } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import RoomInfo from './RoomInfo';

const ChatTop = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Card
      bg={'purple.500'}
      color={'white'}
      roundedTopRight={0}
      roundedTopLeft={0}
      roundedBottomRight={0}
    >
      <CardBody>
        <Flex w={'100%'} justify={'space-between'} alignItems={'center'}>
          <Flex justify={'space-between'} alignItems={'center'} gap={10}>
            <IconButton
              size={'lg'}
              icon={<BiArrowBack />}
              colorScheme="purple"
              // bg={'white'}
              // _hover={{ backgroundColor: 'gray.100' }}
              onClick={() => navigate(-1)}
              rounded={100}
            />
            <Heading size={'md'} fontWeight={'normal'}>
              {title}
            </Heading>
          </Flex>

          {/* <IconButton
            size={'lg'}
            icon={<BsThreeDotsVertical />}
            colorScheme="purple"
            // bg={'white'}
            // _hover={{ backgroundColor: 'gray.100' }}
            rounded={100}
          /> */}
          <RoomInfo />
        </Flex>
      </CardBody>
    </Card>
  );
};
export default ChatTop;
