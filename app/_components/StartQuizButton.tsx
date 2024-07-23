"use client";

import { Button } from "@/components/ui/button";
import { useQuiz } from "../context/QuizContext";

function StartQuizButton() {
  const { setQuizInProgress } = useQuiz();

  return (
    <Button onClick={() => setQuizInProgress(true)}>
      Speak with the guide
    </Button>
  );
}

export default StartQuizButton;
