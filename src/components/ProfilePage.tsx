import React, { useState } from 'react';
import './ProfilePage.css';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Navigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db } from '../../firebase.config';
import logo from '../assets/BEHONEST02.png'; // Adjust the path as necessary
import logow from '../assets/BEHONEST_w.png'; // Adjust the path as necessary
import profileIcon from '../assets/defaultPhoto.png'; // Adjust the path as necessary
// import Header from '../components/Header.tsx';

import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Spinner } from '@chakra-ui/react';
// import { getStorage } from 'firebase/storage';

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
  const storage = getStorage();

  function UploadImage() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      alert("To save changes click 'Upload'");
    };

    const handleUpload = async () => {
      try {
        if (!file) {
          console.error('No file selected');

          return;
        }

        const imageRef = ref(storage, `images/${Date.now()}-${file.name}`);
        await uploadBytes(imageRef, file);

        const profilePictureUrl = await getDownloadURL(imageRef);

        if (currentUserRef) {
          await updateDoc(currentUserRef, { profileImage: profilePictureUrl });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error appropriately
      }
    };

    return (
      <div>
        <input id="file-input" className="input-file" type="file" onChange={handleFileChange} />
        <label htmlFor="file-input" className="label-file">
          Choose a file
        </label>
        <button className="label-file" onClick={handleUpload}>
          Upload
        </button>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="app josefin-sans">
        <Header />
        <div className='center'>
          <Spinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app josefin-sans">
      <Header />
      <div className="white-rectangle">
        <div className="row">
          <img src={currentUser.profileImage || profileIcon} alt="Profile" className="profile-icon" />
          <div>
            <div className="nickname">{currentUser.username}</div>
            <div className="followers">{currentUser.followers.length} Followers</div>
            {/* <div className="button"><UploadImage /></div> */}
            <UploadImage />
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
      <Footer />
    </div>
  );
};

function getValue(obj, key) {
  return obj[key];
}

function Card({ question, answer }) {
  return (
    <div className="card">
      <h2 className="question josefin-sans">{question}</h2>
      <p className="answer">{answer}</p>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <img src={logow} alt="Profile" className="logo-icon" />
    </div>
  );
}

function Header() {
  function handleClick() {
    signOut(auth);
  }

  return (
    <header className="header">
      <a href="/main">
        <img src={logo} alt="Logo" className="logo" />
      </a>
      {/* <a id="myButton" className="button" href="/search">
        search
      </a> */}
      <a id="myButton" className="button" onClick={handleClick} href="/auth">
        Sign Out
      </a>
      {/* <img src={profileIcon} alt="Profile" className="profile-icon" /> */}
    </header>
  );
}

export default ProfilePage;
