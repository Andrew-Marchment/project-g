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
import SpinnerMini from "./SpinnerMini";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useChat } from "ai/react";
import { useQuiz } from "../context/QuizContext";
import { QUIZ_SIZE } from "@/lib/constants";
import { questions } from "@/lib/questions";
import { RefreshCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

function Quiz() {
  const [answer, setAnswer] = useState("");
  const [displayFieldRequiredText, setDisplayFieldRequiredText] =
    useState(false);
  const [error, setError] = useState("");

  const {
    currentQuestion,
    answers,
    quizComplete,
    giftIdeas,
    incrementCurrentQuestion,
    decrementCurrentQuestion,
    setAnswers,
    setQuizComplete,
    setGiftIdeas,
    restartQuiz,
  } = useQuiz();

  const { append, isLoading } = useChat({
    api: "/api/gpt",
    onFinish: (message) => {
      setError("");
      console.log(message);
      const giftIdeas = message.content
        .replace("- ", "")
        .replace(".", "")
        .replaceAll("\n", "")
        .split(",  - ");

      setGiftIdeas(giftIdeas);
    },
    onError: (error) => {
      setError(`An error occured calling the OpenAI API: ${error}`);
    },
  });

  const progress = (currentQuestion / (QUIZ_SIZE + 1)) * 100;

  function handlePreviousQuestion() {
    setAnswer(answers[currentQuestion - 1]);
    if (answer !== "") setAnswers(answer);
    decrementCurrentQuestion();
  }

  function handleNextQuestion() {
    if (answer === "") {
      setDisplayFieldRequiredText(true);
    } else {
      setAnswers(answer);
      incrementCurrentQuestion();
      answers[currentQuestion + 1]
        ? setAnswer(answers[currentQuestion + 1])
        : setAnswer("");
      setDisplayFieldRequiredText(false);
    }
  }

  function handleGenerateGiftIdeas() {
    if (answer === "") {
      setDisplayFieldRequiredText(true);
    } else {
      setQuizComplete();
      append({
        role: "system",
        content: `Create an unordered list of four gift ideas, separated by commas with no dash at the start, based on the answers to the following questions:${questions.map((question) => ` ${question.question}`)}. Here are the answers given: ${answers},${answer}`,
      });
      setDisplayFieldRequiredText(false);
    }
  }

  function handleRestartQuiz() {
    setAnswer("");
    restartQuiz();
  }

  return (
    <div className="relative">
      <Image
        src="/Gift Guide Wizard.png"
        alt="The Gift Guide"
        width={300}
        height={400}
        className="absolute right-[-300px]"
      />
      {giftIdeas.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Provide the guide with information</CardTitle>
            <CardDescription>
              Answer the guide&apos;s questions about the person you&apos;re
              buying for.
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
              <p className="mt-1 text-start text-sm text-destructive">
                Please answer the guide&apos;s question.
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
                Go back
              </Button>
            )}
            {currentQuestion < QUIZ_SIZE ? (
              <Button onClick={handleNextQuestion}>Continue</Button>
            ) : (
              <Button
                className="min-w-56"
                onClick={handleGenerateGiftIdeas}
                disabled={isLoading}
              >
                {isLoading ? <SpinnerMini /> : "See what the guide has to say"}
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>The guide has spoken</CardTitle>
            <CardDescription>
              Here are is personal recommendations of gifts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-start">
              {giftIdeas.map((giftIdea, i) => (
                <li className="mb-2" key={i}>
                  <p className="mb-2">{giftIdea}</p>
                  {i < giftIdeas.length - 1 && <Separator />}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex-row-reverse">
            <Button
              className="flex items-center gap-2"
              onClick={handleRestartQuiz}
            >
              <span>Restart Quiz</span>
              <RefreshCcw size={16} />
            </Button>
          </CardFooter>
        </Card>
      )}
      {error && <p className="mt-2 w-full text-destructive">{error}</p>}
    </div>
  );
}

export default Quiz;
