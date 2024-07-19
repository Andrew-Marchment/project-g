import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuiz } from "../context/QuizContext";

type QuestionType = {
  question: string;
  placeholder: string;
};

interface QuestionProps {
  question: QuestionType;
}

function Question({ question }: QuestionProps) {
  const { currentQuestion } = useQuiz();

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
      />
    </div>
  );
}

export default Question;
