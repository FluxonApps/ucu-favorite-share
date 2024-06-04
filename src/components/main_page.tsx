import { useState, useEffect } from 'react';

function Main() {
  const [questions, setQuestions] = useState([
    "What is your favorite book?",
    "What is your favorite movie?",
    "What is your favorite food?",
    "What is your favorite hobby?",
    "What is your favorite place to visit?",
    "What is your favorite song?",
    "What is your favorite animal?",
    "What is your favorite color?",
    "What is your favorite season?"
  ]);

  const [answers, setAnswers] = useState([]);
  const [images, setImages] = useState<File[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  useEffect(() => {
    getRandomQuestion();

    const interval = setInterval(() => {
      getRandomQuestion();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getRandomQuestion = () => {
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[randomIndex] || '');
    } else {
      setCurrentQuestion('No questions available');
    }
  };

  const submitAnswer = () => {
    const userAnswerInput = document.getElementById("user-answer") as HTMLInputElement;
    const userImageInput = document.getElementById("user-image") as HTMLInputElement;

    const userAnswer = userAnswerInput.value.trim();
    if (userAnswer !== "") {
      setAnswers([...answers, userAnswer]);
      setImages([...images, userImageInput.files![0]]);

      alert("Answer submitted successfully");

      userAnswerInput.value = "";
      userImageInput.value = "";
    } else {
      alert("Please enter an answer");
    }
  };

  const addQuestion = () => {
    const newQuestionInput = document.getElementById("new-question") as HTMLInputElement;
    const newQuestion = newQuestionInput.value.trim();
    if (newQuestion !== "") {
      setQuestions([...questions, newQuestion]);
      newQuestionInput.value = "";
      alert("New question added successfully");
    } else {
      alert("Please enter a valid question");
    }
  };

  return (
    <div>
      <div id="question-container">
        {currentQuestion}
      </div>
      <div id="answer-container">
        <input type="text" id="user-answer" placeholder="Your answer" />
        <input type="file" id="user-image" accept="image/*" />
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
