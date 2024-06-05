import React from 'react';

import './ProfilePage.css';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Navigate } from 'react-router-dom';

import { db } from '../../firebase.config';
import logo from '../assets/BEHONEST02.png'; // Adjust the path as necessary
import profileIcon from '../assets/profile_icon.png'; // Adjust the path as necessary

import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Spinner } from '@chakra-ui/react';

interface User {
  id: string;
  email: string;
  username: string;
  answers: Array<Array<string>>;
  followers: Array<string>;
}
const auth = getAuth();

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

const ProfilePage = () => {
  const [user, userLoading] = useAuthState(auth);

  const currentUserRef = user && doc(db, `/users/${user.uid}`);

  const [currentUser, currentUserLoading] = useDocumentData(currentUserRef);

  const answers = currentUser && currentUser.answers;

  if (userLoading && currentUserLoading) {
    return <Spinner />;
  }

  if (!currentUser) {
    return 'No user!';
  }

  return (
    <div className="app josefin-sans">
      <Header />
      <div className="white-rectangle">
        <div className="row">
          <img src={profileIcon} alt="Profile" className="profile-icon" />
          <div>
            <div className="nickname">{currentUser.username}</div>
            <div className="followers">{currentUser.followers.length} Followers</div>
            <div className="button">Change</div>
          </div>
        </div>
        <div className="cards row">
          {Object.entries(answers).map(([key, value]) => {
            const [question, answer] = value as [string, string];

            return (
              <div>
                <Card question={question} answer={answer} />
              </div>
            );
          })}
          {/* <h2 className="question josefin-sans">{currentUser.answers}</h2>
            <p className="answer">{currentUser.answers}</p> */}
        </div>
      </div>
    </div>
  );
};

function getValue(obj, key) {
  return obj[key];
}

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <img src={profileIcon} alt="Profile" className="profile-icon" />
    </header>
  );
}

function Card({ question, answer }) {
  return (
    <div className="card">
      <h2 className="question josefin-sans">{question}</h2>
      <p className="answer">{answer}</p>
    </div>
  );
}

export default ProfilePage;

