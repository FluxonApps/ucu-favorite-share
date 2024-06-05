import { Routes, Route } from 'react-router-dom';
import { Stack, Img, Link, Text, HStack } from '@chakra-ui/react'; // Import necessary Chakra UI components
import MainLayout from './components/layout/MainLayout'; // Update import path for MainLayout
import AuthPage from './components/AuthPage'; // Remove .tsx extension
import DashboardPage from './components/DashboardPage'; // Remove .tsx extension
import FirebaseDemo from './components/FirebaseDemo'; // Remove .tsx extension
import Main from './components/main_page'; // Remove .tsx extension
import logoWhite from '../logo_white.png';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<EventPage />} />
      <Route path="/firebase-demo" element={<FirebaseDemo />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/main" element={<Main />} />
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

