import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase.config';

const usersCollectionRef = collection(db, 'users');

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, usersLoading, usersError] = useCollectionData(usersCollectionRef, { idField: 'id' });

  const filteredUsers = users && users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>All Users</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {usersLoading && <li>Loading...</li>}
        {usersError && <li>Error loading users: {usersError.message}</li>}
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))
        ) : (
          !usersLoading && <li>No users found</li>
        )}
      </ul>
    </div>
  );
}

export default Search;
