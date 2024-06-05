import React from 'react';

import './ProfilePage.css';
import logo from '../assets/BEHONEST02.png'; // Adjust the path as necessary
import profileIcon from '../assets/profile_icon.png'; // Adjust the path as necessary

const preconnectFontGoogle = document.createElement('link');
preconnectFontGoogle.rel = 'preconnect';
preconnectFontGoogle.href = 'https://fonts.googleapis.com';

const preconnectFontGstatic = document.createElement('link');
preconnectFontGstatic.rel = 'preconnect';
preconnectFontGstatic.href = 'https://fonts.gstatic.com';
preconnectFontGstatic.setAttribute('crossorigin', '');

const fontStyleSheet = document.createElement('link');
fontStyleSheet.href = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap';
fontStyleSheet.rel = 'stylesheet';

document.head.appendChild(preconnectFontGoogle);
document.head.appendChild(preconnectFontGstatic);
document.head.appendChild(fontStyleSheet);

const ProfilePage = () => {
  return (
    <div className="app josefin-sans">
      <Header />
      <div className="white-rectangle">
        <div className="row">
          <img src={profileIcon} alt="Profile" className="profile-icon" />
          <div>
            <div className="nickname">Nickname</div>
            <div className="followers">69 Followers</div>
          </div>
        </div>
        <div className="cards">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
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

function Card() {
  return (
    <div className="card">
      <h2 className='question josefin-sans'>question</h2>
      <p className="answer">answer</p>
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
