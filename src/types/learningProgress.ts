import { DayType } from "./day"

export type LearningProgressType = {
    _id?: string,
    day: string | DayType,
    user: string,
    listeningSpeakingScore: number,
    vocabularyScore: number,
    structureSentencesScore: number,
    conversationScore: number,
    grammarScore: number,
    oralWeekVocabularyScore?: number,
    oralWeekSentencesScore?: number,
    oralScore: number,
    isPass: boolean,
    createdAt?: string,
    updatedAt?: string
}

export type AddLearningProgressType = {
    day: string | undefined,
    user: string | undefined,
 
}