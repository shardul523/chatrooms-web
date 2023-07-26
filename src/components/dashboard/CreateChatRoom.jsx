import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useDisclosure,
  InputGroup,
  InputRightAddon,
  Flex,
} from '@chakra-ui/react';
import { IoMdCreate } from 'react-icons/io';
import { useRef, useState } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { AiOutlineCheck } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';

import { chatroomSchema } from '../../validations';
import { useAlert } from '../../hooks';
import { roomsWithJoinId, addNewRoom } from '../../utility';
import { useGetUser } from '../../context/UserContext';

// const INITIAL_FORM_DATA = { title: '', description: '' };

const CreateChatRoom = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const alert = useAlert();
  const { user } = useGetUser();

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const joinIdInputRef = useRef();

  const closeModal = () => {
    setIsAvailable(null);
    titleInputRef.current.value =
      descriptionInputRef.current.value =
      joinIdInputRef.current.value =
        '';
    onClose();
  };

  const onRoomCreate = async e => {
    e?.preventDefault();

    try {
      const title = titleInputRef.current.value;
      const description = descriptionInputRef.current.value;
      const joinId = joinIdInputRef.current.value;

      const formData = { title, description, joinId };

      if (!chatroomSchema.isValidSync(formData))
        throw new Error('Invalid form data');

      setIsCreating(true);

      const newRoomData = {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        admins: [user.uid],
        members: [user.uid],
      };

      // const roomsCollectionRef = collection(db, 'rooms');
      // const newRoomRef = await addDoc(roomsCollectionRef, newRoomData);
      // const currentUserRef = doc(db, 'users', auth.currentUser.uid);
      // await updateDoc(currentUserRef, {
      //   rooms: arrayUnion(newRoomRef.id),
      // });

      await addNewRoom(user.uid, newRoomData);

      closeModal();

      // setTitle(INITIAL_FORM_DATA.title);
      // setDescription(INITIAL_FORM_DATA.description);

      alert({ title: 'New ChatRoom created successfully', status: 'success' });
    } catch (err) {
      alert({ title: err.message, status: 'error' });
    } finally {
      setIsCreating(false);
      setIsAvailable(null);
      onClose();
    }
  };

  const checkAvailable = async () => {
    setIsChecking(true);
    const joinId = joinIdInputRef.current.value;
    const res = await roomsWithJoinId(joinId);
    setIsAvailable(res.empty);
    setIsChecking(false);
  };

  return (
    <>
      <Button
        w={'45%'}
        leftIcon={<IoMdCreate />}
        colorScheme="pink"
        onClick={onOpen}
      >
        New Chatroom
      </Button>
      <Modal isOpen={isOpen} size={'lg'} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text>Create New Chatroom</Text>
          </ModalHeader>
          <ModalBody>
            <FormControl as={'form'} onSubmit={onRoomCreate}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                placeholder="Enter the title of the chatroom"
                focusBorderColor="purple"
                ref={titleInputRef}
              />
              <FormLabel htmlFor="joinId">Room Join Id</FormLabel>
              <InputGroup>
                <Input
                  id="joinId"
                  placeholder="Enter the id used to add new members"
                  focusBorderColor="purple"
                  ref={joinIdInputRef}
                />
                <InputRightAddon p={0}>
                  <Button
                    colorScheme="purple"
                    borderTopLeftRadius={0}
                    borderBottomLeftRadius={0}
                    onClick={checkAvailable}
                    isLoading={isChecking}
                    loadingText="Checking"
                  >
                    Check
                  </Button>
                </InputRightAddon>
              </InputGroup>
              {isAvailable && (
                <Flex color={'whatsapp.500'} align={'center'}>
                  <AiOutlineCheck /> Available
                </Flex>
              )}
              {isAvailable === false && (
                <Flex color={'red.500'} align={'center'}>
                  <RxCross2 /> Not Available
                </Flex>
              )}

              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                rows={5}
                focusBorderColor="purple"
                id="description"
                ref={descriptionInputRef}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="pink"
              variant={'outline'}
              w={'100%'}
              //   onClick={onCreate}
              onClick={onRoomCreate}
              isLoading={isCreating}
              loadingText="Creating"
              isDisabled={!isAvailable}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateChatRoom;
