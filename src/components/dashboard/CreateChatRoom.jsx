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
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';

import { chatroomSchema } from '../../validations';
import { db } from '../../config/firebase';

const INITIAL_FORM_DATA = { title: '', description: '' };

const CreateChatRoom = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  //   const onCreate = async () => {
  //     const formData = { title, description };

  //     if (!chatroomSchema.isValidSync(formData)) return;

  //     setIsCreating(true);

  //     const newRoomData = {...formData, createdAt: serverTimestamp()}

  //     try {
  //         doc(db, 'rooms', '')
  //     }

  //     setIsCreating(false);
  //   };

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
            <FormControl as={'form'}>
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
