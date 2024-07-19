"use client";

import { QUIZ_SIZE } from "@/lib/constants";
import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

type StateType = {
  quizInProgress: boolean;
  currentQuestion: number;
};

export const initialState: StateType = {
  quizInProgress: false,
  currentQuestion: 0,
};

const enum REDUCER_ACTION_TYPE {
  SET_QUIZ_IN_PROGRESS,
  INCREMENT_CURRENT_QUESTION,
  DECREMENT_CURRENT_QUESTION,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: any;
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_QUIZ_IN_PROGRESS:
      return { ...state, quizInProgress: action.payload ?? false };
    case REDUCER_ACTION_TYPE.INCREMENT_CURRENT_QUESTION:
      return { ...state, currentQuestion: state.currentQuestion + 1 ?? 0 };
    case REDUCER_ACTION_TYPE.DECREMENT_CURRENT_QUESTION:
      return { ...state, currentQuestion: state.currentQuestion - 1 ?? 0 };
    default:
      throw new Error("unknown action");
  }
};

const useQuizContext = (initialState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setQuizInProgress = useCallback(
    (quizInProgress: boolean) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_QUIZ_IN_PROGRESS,
        payload: quizInProgress,
      }),
    [],
  );

  const incrementCurrentQuestion = useCallback(
    () =>
      dispatch({
        type: REDUCER_ACTION_TYPE.INCREMENT_CURRENT_QUESTION,
      }),
    [],
  );

  const decrementCurrentQuestion = useCallback(
    () =>
      dispatch({
        type: REDUCER_ACTION_TYPE.DECREMENT_CURRENT_QUESTION,
      }),
    [],
  );

  return {
    state,
    setQuizInProgress,
    incrementCurrentQuestion,
    decrementCurrentQuestion,
  };
};

type UseQuizContextType = ReturnType<typeof useQuizContext>;

const initialContextState: UseQuizContextType = {
  state: initialState,
  setQuizInProgress: (quizInProgress: boolean) => {},
  incrementCurrentQuestion: () => {},
  decrementCurrentQuestion: () => {},
};

export const QuizContext =
  createContext<UseQuizContextType>(initialContextState);

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const QuizProvider = ({
  children,
  ...initialState
}: ChildrenType & StateType): ReactElement => {
  return (
    <QuizContext.Provider value={useQuizContext(initialState)}>
      {children}
    </QuizContext.Provider>
  );
};

type UseQuizHookType = {
  quizInProgress: boolean;
  currentQuestion: number;
  setQuizInProgress: (quizInProgress: boolean) => void;
  incrementCurrentQuestion: () => void;
  decrementCurrentQuestion: () => void;
};

export const useQuiz = (): UseQuizHookType => {
  const {
    state: { quizInProgress, currentQuestion },
    setQuizInProgress,
    incrementCurrentQuestion,
    decrementCurrentQuestion,
  } = useContext(QuizContext);
  return {
    quizInProgress,
    currentQuestion,
    setQuizInProgress,
    incrementCurrentQuestion,
    decrementCurrentQuestion,
  };
};
