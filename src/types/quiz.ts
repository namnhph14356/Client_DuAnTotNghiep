import { PracticeActivityType } from "./practiceActivity";

export type QuizType = {
  _id?: string;
  category?: string;
  question: string;
  questionAfter?: string;
  image?: string;
  meaning?:string,
  suggestions?:string,
  timeLimit?: string;
  type?: string;
  status?: boolean;
  practiceActivity?: PracticeActivityType;
  createdAt?: string;
  updatedAt?: string;
};
