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
  const { currentQuestion, answers, setAnswers } = useQuiz();

  return (
    <div className="text-left">
      <Label htmlFor={`question-${currentQuestion + 1}`}>
        {question.question}
      </Label>
      <Input
        id={`question-${currentQuestion + 1}`}
        className="mt-2"
        type="text"
        placeholder={question.placeholder}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
    </div>
  );
}

export default Question;
