import { Box } from '@chakra-ui/react';

const ListContainer = ({ height, children, bg }) => {
  return (
    <Box
      h={height}
      overflowY={'auto'}
      overflowX={'hidden'}
      sx={{
        '&::-webkit-scrollbar:horizontal': {
          width: '7.5px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track-piece': {
          background: { bg },
        },
      }}
    >
      {children}
    </Box>
  );
};
export default ListContainer;
