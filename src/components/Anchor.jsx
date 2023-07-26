import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Anchor = ({ children, ...linkProps }) => {
  return (
    <Link
      as={RouterLink}
      {...linkProps}
      cursor={'pointer'}
      _hover={{ textDecor: 'none' }}
    >
      {children}
    </Link>
  );
};
export default Anchor;
