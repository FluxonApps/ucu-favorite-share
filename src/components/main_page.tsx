import './main_page.css'; // Create a CSS file for custom styles

import { CollectionReference, addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Navigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useCollection, useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, db } from '../../firebase.config';
import logo from '../assets/BEHONEST02.png'; // Ensure the correct path to your image file
import profileIcon from '../assets/defaultPhoto.png'

interface Question {
  question: string;
}
interface User {
  id: string;
  email: string;
  username: string;
  answers: Array<Array<string>>;
  followers: Array<string>;
}
const questionsCollectionRef = collection(db, 'questions') as CollectionReference<Question>;

function Main() {
  const [user] = useAuthState(auth);
  const userRef = user && doc(db, `users/${user.uid}`);

  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  const [currentUser, currentUserLoading] = useDocumentData(userRef);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const currentDay = mm + '/' + dd + '/' + yyyy;

  const redirectToMainFeed = Boolean(currentUser?.answers[currentDay]);

  const getRandomQuestion = () => {
    if (!questionsLoading && questions !== undefined) {
      if (questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(questions[randomIndex]?.question || null);
      } else {
        setCurrentQuestion('No questions available');
      }
    }
  };

  useEffect(() => {
    getRandomQuestion();

    const interval = setInterval(() => {
      getRandomQuestion();
    }, 100000);

    return () => clearInterval(interval);
  }, [getRandomQuestion]);

  const [questions, questionsLoading] = useCollectionData(questionsCollectionRef);

  if (user && currentUser && (currentDay in currentUser.answers)) {
    return <Navigate to="/main_feed" replace />;
  }

  const submitAnswer = async () => {
    const userAnswerInput = document.getElementById('user-answer') as HTMLInputElement;

    if (!userAnswerInput) {
      console.error('user-answer element not found');

      return;
    }

    const userAnswer = userAnswerInput.value.trim();

    if (userAnswer === '') {
      alert('Please enter an answer');

      return;
    }

    if (userAnswer.length >= 50) {
      alert('Your answer has reached 50 characters!');

      return;
    }

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const currentDay = mm + '/' + dd + '/' + yyyy;

    try {
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data() as User;
      const updatedAnswers = {
        ...userData.answers,
        [currentDay]: [currentQuestion, userAnswer],
      };

      await updateDoc(userRef, { answers: updatedAnswers });

      userAnswerInput.value = '';
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('An error occurred while submitting your answer. Please try again.');
    }
  };

  const addQuestion = () => {
    const newQuestionInput = document.getElementById('new-question') as HTMLInputElement;
    const newQuestion = newQuestionInput.value.trim();
    if (newQuestion.length >= 50) {
      alert('Your question has reached 50 characters!');

      return;
    }

    if (newQuestion !== '') {
      addDoc(questionsCollectionRef, { question: newQuestion });
      newQuestionInput.value = '';
      alert('New question added successfully');
    } else {
      alert('Please enter a valid question');
    }
  };
  if (redirectToMainFeed) {
    return <Navigate to="/main_feed" replace />;
  }

  return (
    <div className="app-container">
      <Header />

      <main>
        {/* Question Section in a Separate Container */}
        <section className="question-section">
          <div id="question-container" className="question-container">
            {currentQuestion}
          </div>
        </section>

        {/* Answer Section in a Separate Container */}
        <section className="answer-section">
          <textarea id="user-answer" placeholder="Write your answer here..." className="answer-input" />
          <button onClick={submitAnswer} className="submit-button">
            Post
          </button>
        </section>
      </main>
      <main>
        {/* Add Question Section (remains the same) */}
        <section className="add-question-section">
          <input type="text" id="new-question" placeholder="Enter a new question" className="new-question-input" />
          <button onClick={addQuestion} className="add-question-button">
            Add Question
          </button>
        </section>
      </main>
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

function SearchButton() {
  return (
    <div className="search-button">
      <a href="/search">
        <button>Search for new friends...</button>
      </a>
    </div>
  );
}

export default Main;
