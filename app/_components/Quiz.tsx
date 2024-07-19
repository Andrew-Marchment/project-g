"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Question from "./Question";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuiz } from "../context/QuizContext";
import { QUIZ_SIZE } from "@/lib/constants";
import { useState } from "react";

function Quiz() {
  const [answer, setAnswer] = useState("");

  const {
    currentQuestion,
    answers,
    incrementCurrentQuestion,
    decrementCurrentQuestion,
    setAnswers,
  } = useQuiz();

  const progress = (currentQuestion / (QUIZ_SIZE + 1)) * 100;

  const questions = [
    {
      question:
        "What are some activities he/she enjoys doing in his/her free time?",
      placeholder: "Example: Reading, sports, cooking, etc.",
    },
    {
      question: "Do you know his/her favorite type of music, movies, or books?",
      placeholder: "Example: Rock music, action movies, mystery novels, etc.",
    },
    {
      question: "Has he/she mentioned anything he/she needs or wants recently?",
      placeholder:
        "Example: New headphones, kitchen gadget, workout gear, etc.",
    },
    {
      question:
        "How does he/she typically spend his/her weekends or vacations?",
      placeholder: "Example: Hiking, relaxing at home, traveling, etc.",
    },
    {
      question:
        "Is he/she a fan of any specific brands, sports teams, or cultural icons?",
      placeholder: "Example: Nike, New York Yankees, Star Wars, etc.",
    },
  ];

  function handlePreviousQuestion() {
    setAnswer(answers[currentQuestion - 1]);
    if (answer !== "") setAnswers(answer);
    decrementCurrentQuestion();
  }

  function handleNextQuestion() {
    setAnswers(answer);
    incrementCurrentQuestion();
    answers[currentQuestion + 1]
      ? setAnswer(answers[currentQuestion + 1])
      : setAnswer("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gift Ideas Quiz</CardTitle>
        <CardDescription>
          Answer the following questions about the person you&apos;re buying
          for.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress className="mb-6" value={progress} />
        <Question
          question={questions[currentQuestion]}
          answer={answer}
          setAnswer={setAnswer}
        />
      </CardContent>
      <CardFooter
        className={`justify-between ${currentQuestion === 0 ? "flex-row-reverse" : ""}`}
      >
        {currentQuestion > 0 && (
          <Button variant="outline" onClick={handlePreviousQuestion}>
            Previous question
          </Button>
        )}
        {currentQuestion < QUIZ_SIZE ? (
          <Button onClick={handleNextQuestion}>Next question</Button>
        ) : (
          <Button
            onClick={() => {
              if (currentQuestion < QUIZ_SIZE + 1) incrementCurrentQuestion;
            }}
          >
            Generate gift ideas
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default Quiz;
