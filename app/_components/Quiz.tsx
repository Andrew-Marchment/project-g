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
import { useChat } from "ai/react";
import SpinnerMini from "./SpinnerMini";

function Quiz() {
  const [answer, setAnswer] = useState("");
  const [displayFieldRequiredText, setDisplayFieldRequiredText] =
    useState(false);

  const {
    currentQuestion,
    answers,
    quizComplete,
    incrementCurrentQuestion,
    decrementCurrentQuestion,
    setAnswers,
    setQuizComplete,
  } = useQuiz();

  const { append, isLoading } = useChat({
    api: "/api/gpt",
    onFinish: (message) => {
      console.log(message);
    },
  });

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
    if (answer === "") {
      setDisplayFieldRequiredText(true);
    }
    // else {
    setAnswers(answer);
    incrementCurrentQuestion();
    answers[currentQuestion + 1]
      ? setAnswer(answers[currentQuestion + 1])
      : setAnswer("");
    setDisplayFieldRequiredText(false);
    // }
  }

  function handleGenerateGiftIdeas() {
    setQuizComplete();
    console.log(
      `Curate 4 gift ideas based on the answers to the following questions:${questions.map((question) => ` ${question.question}`)}. Here are the answers given: ${answers}`,
    );
    // append({
    //   role: "system",
    //   content: `Curate 4 gift ideas based on the answers to the following questions:${questions.map((question) => ` ${question.question}`)}. Here are the answers given: ${answers}`,
    // });
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
        <Progress className="mb-6" value={!quizComplete ? progress : 100} />
        <Question
          question={questions[currentQuestion]}
          answer={answer}
          setAnswer={setAnswer}
        />
        {displayFieldRequiredText && (
          <p className="mt-1 text-start text-sm text-red-600">
            Please provide an answer to the above question.
          </p>
        )}
      </CardContent>
      <CardFooter
        className={`justify-between ${currentQuestion === 0 ? "flex-row-reverse" : ""}`}
      >
        {currentQuestion > 0 && (
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={quizComplete}
          >
            Previous question
          </Button>
        )}
        {currentQuestion < QUIZ_SIZE ? (
          <Button onClick={handleNextQuestion}>Next question</Button>
        ) : (
          <Button
            className="min-w-40"
            onClick={handleGenerateGiftIdeas}
            disabled={isLoading}
          >
            {isLoading ? <SpinnerMini /> : "Generate gift ideas"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default Quiz;
