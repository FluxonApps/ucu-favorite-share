import { CollectionReference, addDoc, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, db } from '../../firebase.config';
import { update } from 'firebase/database';

interface Question {
  question: string;
}
interface User {
  id: string;
  email: string;
  username: string;
  answers: Array<Array<string>>;
  followings: Array<string>;
}
const questionsCollectionRef = collection(db, 'questions') as CollectionReference<Question>;


function Main() {
  const [user, userLoading] = useAuthState(auth);
  const userRef = user && doc(db, `users/${user.uid}`);

  // if (!user) {
  //   return <Navigate to="/auth" replace />;
  // }
  // const [answers, setAnswers] = useState([]);
  // const [answer, setAnswer] = useState('')
  // const [images, setImages] = useState<File[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (!user) {
      //

      return;
    }

    const userAnswerInput = document.getElementById('user-answer') as HTMLInputElement;
    // const userImageInput = document.getElementById("user-image") as HTMLInputElement;

    const userAnswer = userAnswerInput.value.trim();

    if (userAnswer === '') {
      alert('Please enter an answer');

      return;
    }

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const currentDay = mm + '/' + dd + '/' + yyyy;

    const updateData = {
      currentDay: [currentDay, currentQuestion, userAnswer]
    };
    // update(userRef, updateData)
    //   .then(() => {
    //     console.log('Update successful');
    //   })
    //   .catch((error) => {
    //     console.error('Error updating data: ', error);
    //   });
    await updateDoc(userRef, { answers: { [currentDay]: [currentQuestion, userAnswer] } })

    // setAnswers([...answers, userAnswer]);
    // setImages([...images, userImageInput.files![0]]);

    alert('Answer submitted successfully');

    userAnswerInput.value = '';
    // userImageInput.value = "";
  };

  const addQuestion = () => {
    const newQuestionInput = document.getElementById('new-question') as HTMLInputElement;
    const newQuestion = newQuestionInput.value.trim();
    if (newQuestion !== '') {
      // setQuestions([...questions, newQuestion]);
      addDoc(questionsCollectionRef, { question: newQuestion });
      newQuestionInput.value = '';
      alert('New question added successfully');
    } else {
      alert('Please enter a valid question');
    }
  };

  return (
    <div>
      <div id="question-container">{currentQuestion || 'No question'}</div>
      <div id="answer-container">
        <input type="text" id="user-answer" placeholder="Your answer" />
        {/* <input type="file" id="user-image" accept="image/*" /> */}
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
