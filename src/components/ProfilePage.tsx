import React from 'react';
import './ProfilePage.css';
import logo from '../assets/BEHONEST02.png'; // Adjust the path as necessary
import profileIcon from '../assets/profile_icon.png'; // Adjust the path as necessary

const ProfilePage = () => {
    return (
        <div className="app">
            <Header />
            <SearchBar />     
            <div className="white-rectangle"><Card /></div>
        </div>
    );
};

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Logo" className="logo" />
            <img src={profileIcon} alt="Profile" className="profile-icon" />
        </header>
    );
}

function SearchBar() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search your friends" className="search-input" />
        </div>
    );
}

function Card() {
    return (
        <div className="card">
            <input type="text"  className="card" />
            <img src={profileIcon} alt="Profile" className="profile-icon-white" />
        </div>
    );
}
export default ProfilePage;








// function MainContent() {
//     return (
//         <main className="main-content">
//             <h1 className="main-title">QUESTION FOR YOU</h1>
//             <FriendResponse nickname="nickname" answer="friend’s answer" />
//             <FriendResponse nickname="nickname" answer="friend’s answer" />
//             <FriendResponse nickname="nickname" answer="friend’s answer" />
//             <FriendResponse nickname="nickname" answer="friend’s answer" />
//         </main>
//     );
// }

// function FriendResponse({ nickname, answer }) {
//     return (
//         <div className="friend-response">
//             <div className="friend-avatar"></div>
//             <div className="friend-details">
//                 <div className="friend-nickname">{nickname}</div>
//                 <div className="friend-answer">{answer}</div>
//             </div>
//         </div>
//     );
// }

// export default Scrolling;