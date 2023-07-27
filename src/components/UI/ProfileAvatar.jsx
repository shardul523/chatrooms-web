import { Avatar } from '@chakra-ui/react';

const ProfileAvatar = ({ user }) => (
  <Avatar src={user.avatarImage} name={user.name} />
);

export default ProfileAvatar;
