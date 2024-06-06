import { Box } from '@chakra-ui/react';
import { FC } from 'react';

const MainLayout: FC<any> = ({ children }) => (
  <Box h="full" bg="#444A6E">
    {children}
  </Box>
);

export default MainLayout;
