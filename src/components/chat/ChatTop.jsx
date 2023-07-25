import { Flex, IconButton, Heading } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const ChatTop = () => {
  const navigate = useNavigate();

  return (
    // <Card bg={'purple.700'}>
    //   <CardBody>
    <Flex
      w={'100%'}
      justify={'space-between'}
      alignItems={'center'}
      bg={'purple.600'}
      p={5}
      roundedBottom={5}
    >
      <Flex justify={'space-between'} alignItems={'center'} w={'200px'}>
        <IconButton
          size={'lg'}
          icon={<BiArrowBack />}
          colorScheme="purple"
          onClick={() => navigate(-1)}
        />
        <Heading size={'md'} fontWeight={'normal'} color={'white'}>
          Room Name
        </Heading>
      </Flex>

      <IconButton
        size={'lg'}
        icon={<BsThreeDotsVertical />}
        colorScheme="purple"
      />
    </Flex>
    //   </CardBody>
    // </Card>
  );
};
export default ChatTop;
