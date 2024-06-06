import logo from '../assets/BEHONEST02.png'; // Adjust the path as necessary

import './Header.css';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { db } from '../../firebase.config';
import profileIcon from '../assets/defaultPhoto.png';

const auth = getAuth();

function Header() {
  function handleClick() {
    signOut(auth);
  }

  const [user, userLoading] = useAuthState(auth);

  const currentUserRef = user && doc(db, `/users/${user.uid}`);

  const [currentUser, currentUserLoading] = useDocumentData(currentUserRef);

  return (
    <header className="header">
      <a href="/main">
        <img src={logo} alt="Logo" className="logo" />
      </a>

      {currentUser && (
        <a href="/profile">
          <img src={currentUser.profileImage || profileIcon} alt="Profile" className="image" />
        </a>
      )}
    </header>
  );
}

export default Header;
