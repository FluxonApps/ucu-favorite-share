import './Search.css'; // Import and connect your CSS file for styling

import { collection, query, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';

import { db, auth } from '../../firebase.config';
import logo from '../assets/BEHONEST02.png'; // Ensure the correct path and file extension
import photox from '../assets/defaultPhoto.png';
import profileIcon from '../assets/defaultPhoto.png';
import search from '../assets/search.png';
import star from '../assets/star.png';

const usersCollectionRef = collection(db, 'users');

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser] = useAuthState(auth); // Get the current authenticated user

  // Fetch users from Firestore
  const [usersSnapshot, usersLoading, usersError] = useCollection(usersCollectionRef);

  const users = usersSnapshot?.docs.map((snap) => ({ id: snap.id, ...snap.data() }) as any);

  const filteredUsers =
    users &&
    users.filter(
      (user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()) && user.id !== currentUser?.uid,
    );

  function handleInputChange(e) {
    setSearchTerm(e.target.value);
  }

  function isUserFollowed(user) {
    if (!currentUser) {
      return false;
    }

    return user.followers.includes(currentUser.uid);
  }

  async function handleButtonClick(user) {
    if (!currentUser) return;

    const userDocRef = doc(db, 'users', user.id);

    if (isUserFollowed(user)) {
      await updateDoc(userDocRef, {
        followers: arrayRemove(currentUser.uid),
      });
    } else {
      await updateDoc(userDocRef, {
        followers: arrayUnion(currentUser.uid),
      });
    }
  }

  return (
    <div>
      <Header />
      <div>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleInputChange}
            style={{
              backgroundImage: `url(${search})`,
              backgroundSize: '20px 20px',
              backgroundPosition: '10px',
              backgroundRepeat: 'no-repeat',
              paddingLeft: '40px',
            }}
          />

          {users === undefined && <p className='text'>Loading...</p>}
          {filteredUsers &&
            filteredUsers.map((user) => {
              if (searchTerm.length === 0){
                return null
              }
                return (
                  <div key={user.id} className="user-item">
                    <img src={user.profileImage || photox} alt="Profile" className="profile-icon" />
                    <span>{user.username}</span>
                    <div
                      className={`button-container ${isUserFollowed(user) ? 'following' : ''}`}
                      onClick={() => handleButtonClick(user)}
                    >
                      {isUserFollowed(user) ? 'Following' : 'Follow'}
                    </div>
                  </div>
                );
            })}
          {users !== undefined && filteredUsers !== undefined && filteredUsers.length === 0 && <p className='text'>No users found...</p>}

          <div className="row">
            <img src={star} alt="Star" className="star" />
            <img src={star} alt="Star" className="star" />
            <img src={star} alt="Star" className="star" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [user, userLoading] = useAuthState(auth);

  const currentUserRef = user && doc(db, `/users/${user.uid}`);

  const [currentUser, currentUserLoading] = useDocumentData(currentUserRef);

  return (
    <header className="header">
      <a href="/main">
        <img src={logo} alt="Logo" className="logo1" />
      </a>

      {currentUser && (
        <a href="/profile">
          <img src={currentUser.profileImage || profileIcon} alt="Profile" className="image" />
        </a>
      )}
    </header>
  );
}

export default Search;
