"use client";

import StartQuizButton from "./StartQuizButton";
import { useQuiz } from "../context/QuizContext";
import Quiz from "./Quiz";

function QuizContainer() {
  const { quizInProgress } = useQuiz();

  return <>{quizInProgress ? <Quiz /> : <StartQuizButton />}</>;
}

export default QuizContainer;
