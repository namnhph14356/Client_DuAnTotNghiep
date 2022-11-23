import { DayType } from "./day";

export type VocabulatyType = {
  _id?: string;
  sentences?: string;
  structureSentences?: string;
  grammar?: string;
  words: string;
  name?: string;
  wordForm: string;
  meaning: string;
  image: string;
  status?: number;
  audio: string;
  category: string;
  pa: string;
  example: string;
  exampleDirection:string;
  place: number;
  dayId?: DayType;
  createdAt: string;
  updatedAt: string;
};