import { Flex, HStack, Img, Link, Spinner, Stack, Text } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Routes, Route, Navigate } from 'react-router-dom';

import { auth } from '../firebase.config.ts';
import logoWhite from '../logo_white.png';

import AuthPage from './components/AuthPage.tsx';
import MainLayout from './components/layout/MainLayout.tsx';
import Main from './components/main_page.tsx';
import Scrolling from './components/MainPage2.tsx';
import ProfilePage from './components/ProfilePage.tsx';
import Search from './components/Search.tsx';

export const App = () => {
  const [user, userLoading] = useAuthState(auth);

  // User is loading
  if (userLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%" backgroundColor="#2c2b4a">
        <Spinner color="white" />
      </Flex>
    );
  }

  // User is absent (unauthenticated state)
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<EventPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // Authenticated routes
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/main_feed" element={<Scrolling />} />
      <Route path="*" element={<Navigate to="/main" />} />
    </Routes>
  );
};

const EventPage = () => {
  return (
    <MainLayout>
      <Stack spacing={4} justifyContent="center" alignItems="center" h="full">
        <Img h={505} src={logoWhite} />
        <Text color="white" fontSize="xl" mt={2}>
          Be honest with your preferences
        </Text>
        {/* Adjusted mt value */}
        <HStack mt={1} color="blue.100">
          {/* Adjusted mt value for HStack as well */}
          <Link href="/auth">Sign in</Link>
        </HStack>
      </Stack>
    </MainLayout>
  );
};

export default EventPage; // Export EventPage component
