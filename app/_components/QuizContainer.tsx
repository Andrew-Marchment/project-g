"use client";

import StartQuizButton from "./StartQuizButton";
import { useQuiz } from "../context/QuizContext";
import Quiz from "./Quiz";
import Image from "next/image";

function QuizContainer() {
  const { quizInProgress } = useQuiz();

  return (
    <>
      {quizInProgress ? (
        <Quiz />
      ) : (
        <>
          <Image
            src="/Gift Guide Wizard.png"
            alt="The Gift Guide"
            width={300}
            height={400}
            className="mx-auto mb-6"
          />
          <p className="mb-4 max-w-lg p-2 sm:text-xs">
            Answer the guide&apos;s five questions about the person you are
            buying a gift for, and he will provide you with personalized gift
            ideas.
          </p>
          <StartQuizButton />
        </>
      )}
    </>
  );
}

export default QuizContainer;
