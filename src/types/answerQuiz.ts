export type AnswerQuizType = {
    _id?: string,
    quiz: string,
    answer: string,
    isCorrect: number,
    wordMeaning?: string,
    createdAt?: string,
    updatedAt?: string
}

export type AnswerType = {
  _id?: string,
  quiz: string,
  answer: string,
  isCorrect: boolean,
  wordMeaning?: string,
  explainAnswer?: string,
  createdAt?: string,
  updatedAt?: string
}