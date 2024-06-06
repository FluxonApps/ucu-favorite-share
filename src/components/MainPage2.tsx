import logo from '../assets/BEHONEST02.png';
import profileIcon from '../assets/profile_icon.png';

import './MainPage2.css';
import { Spinner } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, where, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';

import { auth, db } from '../../firebase.config';
import defaultphoto from '../assets/defaultPhoto.png';
import gudzak from '../assets/gudzak.png';

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

function Scrolling() {
  const [user] = useAuthState(auth);

  console.log(user);

  const usersCollectionRef = collection(db, 'users');
  const [users, usersLoading, usersError] = useCollection(
    user && query(usersCollectionRef, where('followers', 'array-contains', user.uid)),
  );

  return (
    <div className="app josefin-sans">
      <Header />
      <MainContent users={users} loading={usersLoading} error={usersError} />
    </div>
  );
}

// function Header() {
//   const [user, userLoading] = useAuthState(auth);

//   const currentUserRef = user && doc(db, `/users/${user.uid}`);

//   const [currentUser, currentUserLoading] = useDocumentData(currentUserRef);

//   return (
//     <header className="header">
//       <img src={logo} alt="Logo" className="logo1" />
//       <div style={{ marginLeft: 'auto' }}>
//         <SearchButton />
//       </div>
//       {currentUser && (
//         <a href="/profile">
//           <img src={currentUser.profileImage || profileIcon} alt="Profile" className="image" />
//         </a>
//       )}
//     </header>
//   );
// }

// const auth = getAuth();

function Header() {
  const [user, userLoading] = useAuthState(auth);

  const currentUserRef = user && doc(db, `/users/${user.uid}`);

  const [currentUser, currentUserLoading] = useDocumentData(currentUserRef);

  return (
    <header className="header">
      <a href="/main">
        <img src={logo} alt="Logo" className="logo1" />
      </a>
      <div style={{ marginLeft: 'auto' }}>
        <SearchButton />
      </div>
      {currentUser && (
        <a href="/profile">
          <img src={currentUser.profileImage || profileIcon} alt="Profile" className="image" />
        </a>
      )}
    </header>
  );
}

function MainContent({ users, loading, error }) {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const currentDay = mm + '/' + dd + '/' + yyyy;

  const hasUsersWithPosts =
    users &&
    users.docs.some((doc) => {
      const user = doc.data();
      const answers = user.answers;
      const dates = Object.keys(answers).sort();

      return dates.includes(currentDay);
    });

  return (
    <main className="main-content">
      {error && <p>Error: {error.message}</p>}
      <h1 className="main-title">FOLLOWINGS' ANSWERS</h1>
      {users && users.docs && users.docs.length === 0 && <p>You haven't started following someone yet.</p>}
      {!users && <Spinner />}
      {users && !hasUsersWithPosts && users.docs.length !== 0 && <p>Nobody have posted their answers yet.</p>}
      {users &&
        users.docs.map((doc) => {
          const user = doc.data();
          const answers = user.answers;
          const dates = Object.keys(answers).sort();

          if (!dates.includes(currentDay)) {
            return null;
          }

          const lastAnswer = answers[currentDay];

          return (
            <FriendResponse
              key={doc.id}
              nickname={user.username}
              question={lastAnswer[0]}
              answer={lastAnswer[1]}
              avatar={user.profileImage}
            />
          );
        })}
    </main>
  );
}

function SearchButton() {
  return (
    <div className="search-button">
      <a href="/search">
        <button>Search for new friends...</button>
      </a>
    </div>
  );
}

function FriendResponse({ nickname, question, answer, avatar }) {
  return (
    <div className="friend-response">
      <div className="friend-avatar">
        <img src={avatar || defaultphoto} alt={`${nickname}'s avatar`} className="avatar-img" />
      </div>
      <div className="friend-details">
        <div className="friend-nickname">{nickname}</div>
        <div className="friend-question">
          <strong></strong> {question}
        </div>
        <div className="friend-answer">
          <strong></strong> {answer}
        </div>
      </div>
    </div>
  );
}

export default Scrolling;
