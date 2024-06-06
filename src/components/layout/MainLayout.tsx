import { Box } from '@chakra-ui/react';
import { FC } from 'react';

const MainLayout: FC<any> = ({ children }) => (
  <Box h="full" bg="#2c2b4a">
    {children}
  </Box>
);

export default MainLayout;
