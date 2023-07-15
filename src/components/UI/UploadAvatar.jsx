import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  FormLabel,
  Input,
  FormControl,
} from '@chakra-ui/react';

const avatarFileTypes = '.png, .jpg, jpeg';

const UploadAvatar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <FormControl display={'flex'} justifyContent={'center'} p={'5'}>
        <FormLabel cursor={'pointer'} _hover={{ textDecoration: 'underline' }}>
          Select New Avatar
        </FormLabel>
        <Input type="file" display={'none'} accept={avatarFileTypes} />
      </FormControl>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload New Avatar</ModalHeader>
          <ModalBody>
            <input type="file" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default UploadAvatar;
