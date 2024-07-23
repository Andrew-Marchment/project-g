"use client";

import QuizContainer from "./_components/QuizContainer";
import { initialState, QuizProvider } from "./context/QuizContext";
import { Berkshire_Swash, Charm } from "next/font/google";

const berkshireSwash = Berkshire_Swash({ subsets: ["latin"], weight: ["400"] });
const charm = Charm({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  return (
    <main className="m-0 flex min-h-screen bg-background text-foreground">
      <div className="mx-auto text-center">
        <h1
          className={`${berkshireSwash.className} mb-6 mt-20 text-8xl text-primary antialiased`}
        >
          Gift Guide
        </h1>
        <p
          className={`${charm.className} mb-10 text-3xl text-secondary-foreground antialiased`}
        >
          Unwrap the Magic of Personalized Gifts. <br /> Let Our Guide Lead the
          Way!
        </p>
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
