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
  Box,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { PiUploadSimpleLight } from 'react-icons/pi';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

import { storage, db } from '../../config/firebase';
import { useGetUser } from '../../context/UserContext';
import { useAlert } from '../../hooks';

const avatarFileTypes = ['image/png', 'image/jpeg'];
const isValidFile = img => avatarFileTypes.includes(img.type);
const getBlob = canvas =>
  new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('File process error'));
    });
  });

const UploadAvatar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const avatarEditorRef = useRef();
  const { user } = useGetUser();
  const toast = useAlert();

  const onFileUpload = e => {
    const currFile = e.target.files[0];

    if (!isValidFile(currFile)) {
      toast({ status: 'error', title: 'File Upload Unsuccessful' });
      return;
    }

    setImage(currFile);
    toast({ status: 'success', title: 'File Upload Successful' });
    onOpen();
  };

  const onClickUpload = async () => {
    const avatarImage = avatarEditorRef.current.getImageScaledToCanvas();
    setIsUploading(true);

    try {
      const blob = await getBlob(avatarImage);

      const avatarStorageRef = ref(storage, `/users/${user.uid}/avatar`);

      await uploadBytes(avatarStorageRef, blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await getDownloadURL(avatarStorageRef);

      setDoc(
        doc(db, 'users', user.uid),
        {
          avatarImage: downloadUrl,
        },
        { merge: true },
      );
      setIsUploading(false);
      toast({ status: 'success', title: 'Avatar set successfully' });
      onClose();
    } catch (err) {
      toast({ status: 'success', title: err.message });
      setIsUploading(false);
    }
  };

  return (
    <>
      <FormControl display={'flex'} justifyContent={'center'} p={'5'}>
        <FormLabel cursor={'pointer'} _hover={{ textDecoration: 'underline' }}>
          Select New Avatar
        </FormLabel>
        <Input
          type="file"
          display={'none'}
          accept={avatarFileTypes.join(', ')}
          onChange={onFileUpload}
        />
      </FormControl>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ xs: 'xs', sm: 'sm', md: 'xl' }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Crop and Adjust your New Avatar</ModalHeader>
          <ModalBody>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <AvatarEditor
                image={image}
                width={200}
                height={200}
                border={10}
                rotate={0}
                borderRadius={100}
                ref={avatarEditorRef}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              w={'100%'}
              colorScheme="purple"
              leftIcon={<PiUploadSimpleLight />}
              variant={'outline'}
              onClick={onClickUpload}
              isLoading={isUploading}
              loadingText="Setting"
            >
              Set New Avatar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default UploadAvatar;
