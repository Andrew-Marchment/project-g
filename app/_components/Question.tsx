"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuiz } from "../context/QuizContext";
import { Dispatch, SetStateAction, useState } from "react";

type QuestionType = {
  question: string;
  placeholder: string;
};

interface QuestionProps {
  question: QuestionType;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
}

function Question({ question, answer, setAnswer }: QuestionProps) {
  const { currentQuestion, quizComplete } = useQuiz();

  return (
    <div className="text-left">
      <Label htmlFor={`question-${currentQuestion + 1}`} className="sm:text-xs">
        {question.question}
      </Label>
      <Input
        id={`question-${currentQuestion + 1}`}
        className="mt-2 sm:text-xs"
        type="text"
        placeholder={question.placeholder}
        disabled={quizComplete}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
    </div>
  );
}

export default Question;
