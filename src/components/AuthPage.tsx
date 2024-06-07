import { Box, Button, Flex, Input, Stack, Text, background, useToast } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { db } from '../../firebase.config.ts';

import MainLayout from './layout/MainLayout.tsx';

const preconnectFontGoogle = document.createElement('link');
preconnectFontGoogle.rel = 'preconnect';
preconnectFontGoogle.href = 'https://fonts.googleapis.com';

const preconnectFontGstatic = document.createElement('link');
preconnectFontGstatic.rel = 'preconnect';
preconnectFontGstatic.href = 'https://fonts.gstatic.com';
preconnectFontGstatic.setAttribute('crossorigin', '');

const fontStyleSheet = document.createElement('link');
fontStyleSheet.href =
  'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap';
fontStyleSheet.rel = 'stylesheet';

document.head.appendChild(preconnectFontGoogle);
document.head.appendChild(preconnectFontGstatic);
document.head.appendChild(fontStyleSheet);

const auth = getAuth();
const AuthPage = () => {
  const toast = useToast();

  const [user] = useAuthState(auth);
  const [signInWithEmailAndPassword, , signInLoading] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, , signUpLoading] = useCreateUserWithEmailAndPassword(auth);
  const loading = signInLoading || signUpLoading;

  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');

  const switchAuthMode = () => {
    setShowSignIn((prevState) => !prevState);
    setEmail('');
    setPassword('');
    setUserName('');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const signIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (!res) throw new Error();

      toast({ status: 'success', description: 'Successfully signed in!' });
    } catch (e) {
      console.error(e);
      toast({
        status: 'error',
        title: 'Error',
        description: 'Failed to sign in. Please, try again.',
      });
    }
  };

  const signUp = async () => {
    try {
      const usernameExists = await checkIfUsernameExists(username);

      if (usernameExists) {
        alert('Username is already taken. Please choose a different one.');
        return;
      }

      const res = await createUserWithEmailAndPassword(email, password);
      if (!res) throw new Error();

      const userDocRef = doc(db, 'users', res.user.uid);
      await setDoc(userDocRef, { email, username, followers: [], answers: {} });

      toast({ status: 'success', description: 'Successfully signed up!' });
    } catch (e) {
      console.error(e);
      toast({
        status: 'error',
        title: 'Error',
        description: 'Failed to create a new user. Please, try again.',
      });
    }
  };

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showSignIn) {
      await signIn();
    } else {
      await signUp();
    }
  };

  // Check if user is already signed in. If yes, redirect to main app.
  if (user) {
    return <Navigate to="/main" replace />;
  }

  const checkIfUsernameExists = async (username) => {
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  };

  return (
    <MainLayout>
      <Flex w="full" h="full" alignItems="center" justifyContent="center">
        <Box 
          mx="auto" 
          as="form" 
          onSubmit={handleAuth}
          w={{ base: "90%", sm: "400px", md: "500px" }}
          p={{ base: 4, sm: 6, md: 8 }}
          bg="white" 
          rounded="md"
          style={{backgroundColor: '#e7e3d4'}}
        >
          <Stack spacing={4}>
            <Text fontSize="2xl" textAlign="center" style={{fontFamily: "Josefin Sans"}}>{showSignIn ? 'Sign in' : 'Sign up'}</Text>
            <Input placeholder="Email" type="email" onChange={handleEmailChange} value={email} required style={{borderColor: '#3b3b5f'}}/>
            <Input
              placeholder="Password"
              type="password"
              onChange={handlePasswordChange}
              value={password}
              minLength={6}
              required
              style={{borderColor: '#3b3b5f'}}
            />
            {!showSignIn ? (
              <Input placeholder="Username" onChange={handleUserNameChange} value={username} required style={{borderColor: '#3b3b5f'}}/>
            ) : null}
            <Button type="submit" isDisabled={loading} isLoading={loading} style={{backgroundColor: '#3b3b5f', color: '#e7e3d4'}}>
              Submit
            </Button>
            <Button
              mt={4}
              fontSize="sm"
              fontWeight="normal"
              variant="link"
              onClick={switchAuthMode}
              isDisabled={loading}
              textAlign="center"
            >
              {showSignIn ? 'Create a new account?' : 'Already have an account?'}
            </Button>
          </Stack>
        </Box>
      </Flex>
    </MainLayout>
  );
};

export default AuthPage;
