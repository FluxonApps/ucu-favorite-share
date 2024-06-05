import { CollectionReference, addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, db } from '../../firebase.config';

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
  
      alert('Answer submitted successfully');
      userAnswerInput.value = '';
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('An error occurred while submitting your answer. Please try again.');
    }
  };  

  const addQuestion = () => {
    const newQuestionInput = document.getElementById('new-question') as HTMLInputElement;
    const newQuestion = newQuestionInput.value.trim();
    if (newQuestion !== '') {
      addDoc(questionsCollectionRef, { question: newQuestion });
      newQuestionInput.value = '';
      alert('New question added successfully');
    } else {
      alert('Please enter a valid question');
    }
  };

  return (
    <div>
      <div id="question-container">{currentQuestion || 'Loading...'}</div>
      <div id="answer-container">
        <input type="text" id="user-answer" placeholder="Your answer" />
        <button onClick={submitAnswer}>Submit Answer</button>
      </div>
      <div id="add-question">
        <input type="text" id="new-question" placeholder="Enter a new question" />
        <button onClick={addQuestion}>Add Question</button>
      </div>
    </div>
  );
}

export default Main;
