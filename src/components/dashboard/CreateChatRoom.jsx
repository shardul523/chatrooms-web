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
} from '@chakra-ui/react';
import { IoMdCreate } from 'react-icons/io';
import { useState } from 'react';
import {
  serverTimestamp,
  doc,
  updateDoc,
  collection,
  addDoc,
  arrayUnion,
} from 'firebase/firestore';

import { chatroomSchema } from '../../validations';
import { auth, db } from '../../config/firebase';
import { useAlert } from '../../hooks';

const INITIAL_FORM_DATA = { title: '', description: '' };

const CreateChatRoom = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const alert = useAlert();

  const onRoomCreate = async e => {
    e?.preventDefault();
    const formData = { title, description };

    if (!chatroomSchema.isValidSync(formData))
      throw new Error('Invalid form data');

    setIsCreating(true);

    const newRoomData = {
      ...formData,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.uid,
    };

    try {
      const roomsCollectionRef = collection(db, 'rooms');
      const newRoomRef = await addDoc(roomsCollectionRef, newRoomData);
      const currentUserRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(currentUserRef, {
        rooms: arrayUnion(newRoomRef.id),
      });

      setTitle(INITIAL_FORM_DATA.title);
      setDescription(INITIAL_FORM_DATA.description);

      alert({ title: 'New ChatRoom created successfully', status: 'success' });
    } catch (err) {
      alert({ title: err.message, status: 'error' });
    } finally {
      setIsCreating(false);
      onClose();
    }
  };

  return (
    <>
      <Button
        leftIcon={<IoMdCreate />}
        colorScheme="pink"
        w={'100%'}
        onClick={onOpen}
      >
        Create New Chatroom
      </Button>
      <Modal isOpen={isOpen} size={'lg'} onClose={onClose}>
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
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                rows={5}
                focusBorderColor="purple"
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
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
