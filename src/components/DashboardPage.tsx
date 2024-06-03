import { Box, Button, Spinner, Text } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

const auth = getAuth();

const DashboardPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [signOut, isSigningOut] = useSignOut(auth);

  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return <Spinner />;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Box p={6}>
      <Text>Welcome to your app!</Text>
      <Button onClick={signOut} isDisabled={isSigningOut} isLoading={isSigningOut}>
        Sign out
      </Button>
    </Box>
  );
};

export default DashboardPage;
