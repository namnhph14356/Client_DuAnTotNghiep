import { QuizType } from "./quiz"

export type AnswerQuizType = {
    _id?: string,
    quiz: string | QuizType,
    answer: string,
    isCorrect?: number | boolean,
    wordMeaning?: string,
    explainAnswer?: string,
    createdAt?: string,
    updatedAt?: string
}

export type AnswerType = {
  _id?: string,
  quiz: string | QuizType,
  answer: string,
  isCorrect: boolean,
  wordMeaning?: string,
  explainAnswer?: string,
  createdAt?: string,
  updatedAt?: string
}