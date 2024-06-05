import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../firebase.config';
import './Search.css'; // Import and connect your CSS file for styling

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
        const userDocSnap = await getDocs(userDocRef);
        setCurrentUserData(userDocSnap.data());
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
  const filteredUsers = usersSnapshot && usersSnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) && user.id !== user.uid && user.username !== (currentUserData && currentUserData.username)
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

    const userId = user.uid;

    try {
      const userDocRef = doc(db, 'users', targetUserId);
      if (isUserFollowed(targetUserId)) {
        await updateDoc(userDocRef, {
          followers: arrayRemove(userId)
        });
        setFollowingUsers(prevState => prevState.filter(id => id !== targetUserId));
        console.log(`User ${userId} unfollowed user ${targetUserId}`);
      } else {
        await updateDoc(userDocRef, {
          followers: arrayUnion(userId)
        });
        setFollowingUsers(prevState => [...prevState, targetUserId]);
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
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {displayUsers && ( // Display users only if displayUsers is true
        <ul>
          {usersLoading && <li>Loading...</li>}
          {usersError && <li>Error loading users: {usersError.message}</li>}
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li key={user.id} className="user-item">
                <span>{user.username}</span>
                <div
                  className={`button-container ${isUserFollowed(user.id) ? 'following' : ''}`}
                  onClick={() => handleButtonClick(user.id)}
                >
                  {isUserFollowed(user.id) ? 'Following' : 'Follow'}
                </div>
              </li>
            ))
          ) : (
            !usersLoading && <li>No users found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Search;
