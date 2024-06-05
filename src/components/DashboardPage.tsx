import { Box, Button, Spinner, Text } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Navigate } from 'react-router-dom';
import { db } from '../../firebase.config';
import { doc } from 'firebase/firestore';

const auth = getAuth();

const DashboardPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [signOut, isSigningOut] = useSignOut(auth);

  const currentUserRef = user && doc(db, `/users/${user.uid}`)

  const [currentUser, currentUserLoading] = useDocumentData(currentUserRef)
  
  const answers = currentUser && currentUser.answers;

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
