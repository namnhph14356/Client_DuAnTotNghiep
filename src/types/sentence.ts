export type SentenceType = {
  _id?: string;
  practiceActivity?: string;
  words: string;
  meaning: string;
  phoneticTranscription: string;
  soundCombinations: any;
  structuralAnalysis: string;
  grammarAnalysis: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SentenceResult = {
  quiz: string;
  answerQuiz?: string;
  isCorrect: boolean;
  point: number;
  time: string;
  answer?: string;
};
