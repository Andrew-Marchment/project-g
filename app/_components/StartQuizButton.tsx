"use client";

import { Button } from "@/components/ui/button";
import { useQuiz } from "../context/QuizContext";

function StartQuizButton() {
  const { setQuizInProgress } = useQuiz();

  return <Button onClick={() => setQuizInProgress(true)}>Start Quiz</Button>;
}

export default StartQuizButton;
