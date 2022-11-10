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
  practiceActivity?: string;
  createdAt?: string;
  updatedAt?: string;
};
