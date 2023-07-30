import {
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
  IconButton,
  Button,
  useDisclosure,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { useRooms } from '../../../context/RoomsContext';
import { useParams } from 'react-router-dom';

const RoomDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { chatId } = useParams();
  const { rooms } = useRooms();
  const currRoom = rooms.filter(room => room.roomId === chatId)[0];
  console.log(currRoom);

  return (
    <>
      <Button variant={'ghost'} ref={btnRef} onClick={onOpen}>
        Show Room Info
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        size={{ xs: 'full', lg: 'md' }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{currRoom.title}</DrawerHeader>
          <DrawerBody>
            <Text>Room Name</Text>
          </DrawerBody>
          <DrawerFooter>
            <Button></Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const RoomInfo = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          size={'lg'}
          icon={<BsThreeDotsVertical />}
          colorScheme="purple"
          rounded={100}
        />
      </PopoverTrigger>
      <PopoverContent color="black" width={'fit-content'}>
        <PopoverArrow />
        <PopoverBody>
          <RoomDrawer />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default RoomInfo;
