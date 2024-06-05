import logo from '../assets/BEHONEST02.png';
import profileIcon from '../assets/profile_icon.png';
import './MainPage2.css';
import { Spinner } from '@chakra-ui/react';
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import gudzak from '../assets/gudzak.png'

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

    console.log(user)

    const usersCollectionRef = collection(db, 'users');
    const [users, usersLoading, usersError] = useCollection(user && query(usersCollectionRef, where('followers', 'array-contains', user.uid)));

    return (
        <div className="app josefin-sans">
            <Header />
            <MainContent users={users} loading={usersLoading} error={usersError} />
        </div>
    );
}

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Logo" className="logo" />
            <div style={{marginLeft: 'auto'}}>

            <SearchButton />
            </div>
            <a href="/profile">
                <img src={profileIcon} alt="Profile" className="profile-icon" />
            </a>
        </header>
    );
}

function MainContent({ users, loading, error }) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const currentDay = mm + '/' + dd + '/' + yyyy;

    return (
        <main className="main-content">
            {loading && <Spinner />}
            {error && <p>Error: {error.message}</p>}
            <h1 className="main-title">FRIEND'S QUESTIONS</h1>
            {users && users.docs.map((doc) => {
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
                        avatar={profileIcon}
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
                {/* <img src={avatar} alt={`${nickname}'s avatar`} /> */}
                <img src={gudzak} alt={`${nickname}'s avatar`} />
            </div>
            <div className="friend-details">
                <div className="friend-nickname">{nickname}</div>
                <div className="friend-question"><strong></strong> {question}</div>
                <div className="friend-answer"><strong></strong> {answer}</div>
            </div>
        </div>
    );
}

export default Scrolling;
