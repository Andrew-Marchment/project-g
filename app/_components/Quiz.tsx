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

function Quiz() {
  const [answer, setAnswer] = useState("");
  const [displayFieldRequiredText, setDisplayFieldRequiredText] =
    useState(false);

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
      console.log(message);
      const giftIdeas = message.content
        .replaceAll("\n", "")
        .replaceAll("- ", "")
        .split(", ");
      console.log(giftIdeas);
      setGiftIdeas(giftIdeas);
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
    setQuizComplete();
    append({
      role: "system",
      content: `Create an unordered list of four gift ideas, separated by commas with no dash at the start, based on the answers to the following questions:${questions.map((question) => ` ${question.question}`)}. Here are the answers given: ${answers},${answer}`,
    });
  }

  function handleRestartQuiz() {
    setAnswer("");
    restartQuiz();
  }

  return (
    <>
      {giftIdeas.length === 0 ? (
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
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Gift ideas</CardTitle>
            <CardDescription>
              Below are four personalized gift ideas for you
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
    </>
  );
}

export default Quiz;
