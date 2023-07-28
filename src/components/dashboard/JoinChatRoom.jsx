import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { roomsWithJoinId, joinRoom } from '../../utility';
import { useState } from 'react';
import { useGetUser } from '../../context/UserContext';
import { useAlert } from '../../hooks';

const JoinChatRoom = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputJoinRef = useRef();
  const [isJoining, setIsJoining] = useState(false);
  const toast = useAlert();
  const { user } = useGetUser();

  const onJoin = async () => {
    setIsJoining(true);
    const joinId = inputJoinRef.current.value;

    try {
      const res = await roomsWithJoinId(joinId);

      if (res.empty) throw new Error('No such room exists!');

      if (res.size !== 1) throw new Error('Invalid Room');

      res.forEach(doc => joinRoom(doc.id, user.uid));

      onClose();

      toast({ status: 'success', title: 'Room joined successfully' });
    } catch (err) {
      toast({ status: 'error', title: err.message });
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <>
      <Button
        w={'45%'}
        leftIcon={<AiOutlinePlus />}
        colorScheme="linkedin"
        onClick={onOpen}
      >
        Join Chatroom
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Join an Existing ChatRoom</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Join ID</FormLabel>
              <Input ref={inputJoinRef} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant={'outline'}
              colorScheme="linkedin"
              w={'100%'}
              onClick={onJoin}
              isLoading={isJoining}
              loadingText={'Joining'}
            >
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default JoinChatRoom;
