import './Search.css'; // Import and connect your CSS file for styling

import { Spinner } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { db, auth } from '../../firebase.config';
import logo from '../assets/BEHONEST02.png';
import defaultphoto from '../assets/defaultPhoto.png';
import gudzak from '../assets/gudzak.png';
import search from '../assets/search.png';
import star from '../assets/star.png';

// import Header from '../components/Header.tsx';

const usersCollectionRef = collection(db, 'users');

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user] = useAuthState(auth); // Get the current authenticated user
  const [followingUsers, setFollowingUsers] = useState([]); // State to store followed user IDs
  const [currentUserData, setCurrentUserData] = useState(null); // State to store current user data
  const [displayUsers, setDisplayUsers] = useState(false); // State to control display of users list

  // Fetch users from Firestore
  const queryUsers = query(usersCollectionRef);
  const [usersSnapshot, usersLoading, usersError] = useCollection(queryUsers);

  // Fetch current user data
  useEffect(() => {
    if (user) {
      const fetchCurrentUserData = async () => {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setCurrentUserData(userDocSnap.data());
        }
      };

      fetchCurrentUserData();
    }
  }, [user]);

  // Fetch followed users
  useEffect(() => {
    if (currentUserData && currentUserData.following) {
      setFollowingUsers(currentUserData.following);
    }
  }, [currentUserData]);

  // Filter users based on search term, excluding current user
  const filteredUsers =
    usersSnapshot &&
    usersSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter(
        (u) =>
          u.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
          u.id !== user.uid &&
          u.username !== (currentUserData && currentUserData.username),
      );

  // Function to check if a user is followed
  const isUserFollowed = (userId) => {
    return followingUsers.includes(userId);
  };

  // Handle follow/unfollow button click
  const handleButtonClick = async (targetUserId) => {
    if (!user) {
      console.error('User not logged in');

      return;
    }

    // Check if the target user is the current user
    if (targetUserId === user.uid) {
      console.error('Cannot follow yourself');

      return;
    }

    const userId = user.uid;

    try {
      const userDocRef = doc(db, 'users', targetUserId);
      const currentUserDocRef = doc(db, 'users', userId);
      if (isUserFollowed(targetUserId)) {
        await updateDoc(userDocRef, {
          followers: arrayRemove(userId),
        });
        await updateDoc(currentUserDocRef, {
          following: arrayRemove(targetUserId),
        });
        setFollowingUsers((prevState) => prevState.filter((id) => id !== targetUserId));
        console.log(`User ${userId} unfollowed user ${targetUserId}`);
      } else {
        await updateDoc(userDocRef, {
          followers: arrayUnion(userId),
        });
        await updateDoc(currentUserDocRef, {
          following: arrayUnion(targetUserId),
        });
        setFollowingUsers((prevState) => [...prevState, targetUserId]);
        console.log(`User ${userId} followed user ${targetUserId}`);
      }
    } catch (error) {
      console.error('Error updating followers:', error);
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setDisplayUsers(!!e.target.value); // Set displayUsers to true if input value is not empty
  };

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
              backgroundSize: '30px 30px',
              backgroundPosition: '10px',
              backgroundRepeat: 'no-repeat',
              paddingLeft: '50px',
            }}
          />

          {displayUsers && ( // Display users only if displayUsers is true
            <ul>
              {usersLoading && <li>Loading...</li>}
              {usersError && <li>Error loading users: {usersError.message}</li>}
              {filteredUsers && filteredUsers.length > 0
                ? filteredUsers.map((u) => (
                    <li key={u.id} className="user-item">
                      <span>{u.username}</span>
                      <div
                        className={`button-container ${isUserFollowed(u.id) ? 'following' : ''}`}
                        onClick={() => handleButtonClick(u.id)}
                      >
                        {isUserFollowed(u.id) ? 'Following' : 'Follow'}
                      </div>
                    </li>
                  ))
                : !usersLoading && <li>No users found</li>}
            </ul>
          )}
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
          <img src={currentUser.profileImage || defaultphoto} alt="Profile" className="image" />
        </a>
      )}
    </header>
  );
}

export default Search;
