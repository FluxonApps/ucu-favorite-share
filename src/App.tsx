import { Routes, Route } from 'react-router-dom';

import fluxonLogo from './assets/fluxon-logo.svg';
import AuthPage from './components/AuthPage.tsx';
import DashboardPage from './components/DashboardPage.tsx';
import FirebaseDemo from './components/FirebaseDemo.tsx';
import MainLayout from './components/layout/MainLayout.tsx';
import Main from './components/main_page.tsx';
import logoWhite from '../logo_white.png';
import Search from './components/Search.tsx';
import { HStack, Img, Link, Stack, Text } from '@chakra-ui/react';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<EventPage />} />
      <Route path="/firebase-demo" element={<FirebaseDemo />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/main" element={<Main />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

const EventPage = () => {
  return (
    <MainLayout>
      <Stack spacing={4} justifyContent="center" alignItems="center" h="full">
        <Img w={900} src={logoWhite} />
        <Text color="white" fontSize="xl" mt={2}>Be honest with your preferences</Text> {/* Adjusted mt value */}
        <HStack mt={1} color="blue.100"> {/* Adjusted mt value for HStack as well */}
          <Link href="/auth">Authenticate</Link>
        </HStack>
      </Stack>
    </MainLayout>
  );
};

export default EventPage; // Export EventPage component

