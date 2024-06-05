import React from 'react';
import logo from '../assets/BEHONEST02.png';
import profileIcon from '../assets/profile_icon.png';
import './MainPage2.css';

import { CollectionReference, addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../firebase.config';

function Scrolling() {

    const [user] = useAuthState(auth);
    const userRef = user && doc(db, `users/${user.uid}`);
    
    return (
        <div className="app">
            <Header />
            <MainContent />
        </div>
    );
}

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Logo" className="logo" />
            <SearchButton />
            <a href="/profile">
                <img src={profileIcon} alt="Profile" className="profile-icon" />
            </a>
        </header>
    );
}

function MainContent() {
    return (
        <main className="main-content">
            {/* <SearchBar /> */}
            <h1 className="main-title">FRIEND'S QUESTIONS</h1>
            <FriendResponse nickname="nickname" answer="friend’s answer" />
            <FriendResponse nickname="nickname" answer="friend’s answer" />
            <FriendResponse nickname="nickname" answer="friend’s answer" />
            <FriendResponse nickname="nickname" answer="friend’s answer" />
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

function FriendResponse({ nickname, answer }) {
    return (
        <div className="friend-response">
            <div className="friend-avatar"></div>
            <div className="friend-details">
                <div className="friend-nickname">{nickname}</div>
                <div className="friend-answer">{answer}</div>
            </div>
        </div>
    );
}
export default Scrolling;
