"use client";

import QuizContainer from "./_components/QuizContainer";
import { initialState, QuizProvider } from "./context/QuizContext";

export default function Home() {
  return (
    <main className="m-0 flex min-h-screen bg-background text-foreground">
      <div className="mx-auto text-center">
        <h1 className="mb-10 text-3xl">PROJECT G</h1>
        <QuizProvider
          quizInProgress={initialState.quizInProgress}
          currentQuestion={initialState.currentQuestion}
          answers={initialState.answers}
          quizComplete={initialState.quizComplete}
          giftIdeas={initialState.giftIdeas}
        >
          <QuizContainer />
        </QuizProvider>
      </div>
    </main>
  );
}
