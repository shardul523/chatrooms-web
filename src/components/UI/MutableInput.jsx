import { BiCheck, BiEdit, BiTrash } from 'react-icons/bi';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  IconButton,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

const MutableInput = ({ name }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(name);
  const [inputVal, setInputVal] = useState(name);

  const toast = useToast({
    duration: '5000',
    isClosable: true,
    variant: 'left-accent',
    position: 'top-right',
  });

  const onSaveClick = async () => {
    try {
      setNickname(inputVal);
      await setDoc(
        doc(db, 'users', auth.currentUser.uid),
        {
          name: inputVal,
        },
        { merge: true },
      );
      toast({
        status: 'success',
        title: 'Username changed successfully',
      });
      setIsEditing(false);
    } catch (err) {
      toast({
        status: 'error',
        title: 'User nickname could not be changed',
        description: err.message,
      });
    }
  };

  const onCancelClick = () => {
    setInputVal(nickname);
    setIsEditing(false);
  };

  return (
    <FormControl>
      <FormLabel fontWeight={'bold'}>Nickname</FormLabel>
      <InputGroup>
        <Input
          disabled={!isEditing}
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
        />
        <InputRightAddon p={0}>
          {isEditing && (
            <ButtonGroup isAttached>
              <IconButton icon={<BiCheck />} onClick={onSaveClick} />
              <IconButton icon={<BiTrash />} onClick={onCancelClick} />
            </ButtonGroup>
          )}
          {!isEditing && (
            <IconButton icon={<BiEdit />} onClick={() => setIsEditing(true)} />
          )}
        </InputRightAddon>
      </InputGroup>
    </FormControl>
  );
};

export default MutableInput;
