import { Box } from '@chakra-ui/react';

const ListContainer = ({ height, children }) => {
  return (
    <Box
      h={height}
      as="nav"
      overflowY={'scroll'}
      sx={{
        '&::-webkit-scrollbar': {
          width: '7.5px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '10px',
        },
      }}
    >
      {children}
    </Box>
  );
};
export default ListContainer;
