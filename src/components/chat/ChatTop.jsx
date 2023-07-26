import { Flex, IconButton, Heading, Card, CardBody } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const ChatTop = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardBody>
        <Flex w={'100%'} justify={'space-between'} alignItems={'center'}>
          <Flex justify={'space-between'} alignItems={'center'} gap={10}>
            <IconButton
              size={'lg'}
              icon={<BiArrowBack />}
              // _hover={{ backgroundColor: 'purple.400' }}
              // color={'white'}
              // bg={'purple.600'}
              bg={'white'}
              _hover={{ backgroundColor: 'gray.100' }}
              onClick={() => navigate(-1)}
              rounded={100}
            />
            <Heading size={'md'} fontWeight={'normal'}>
              {title}
            </Heading>
          </Flex>

          <IconButton
            size={'lg'}
            icon={<BsThreeDotsVertical />}
            // _hover={{ backgroundColor: 'purple.400' }}
            // color={'white'}
            // bg={'purple.600'}
            bg={'white'}
            _hover={{ backgroundColor: 'gray.100' }}
            rounded={100}
          />
        </Flex>
      </CardBody>
    </Card>
  );
};
export default ChatTop;
