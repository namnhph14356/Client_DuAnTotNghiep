export type LearningProgressType = {
    _id?: string,
    day: string,
    user: string,
    listeningSpeakingScore: number,
    vocabularyScore: number,
    structureSentencesScore: number,
    conversationScore: number,
    grammarScore: number,
    oralScore: number,
    isPass: boolean,
    createdAt?: string,
    updatedAt?: string
}

export type AddLearningProgressType = {
    day: string,
    user: string | undefined,
 
}