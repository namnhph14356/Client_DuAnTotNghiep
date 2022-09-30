export type AnswerVocabType = {
    _id?: string,
    questionId:string
    answerText:string,
    inCorect:number
} 

export type QuestionVocabType ={
    _id?:string,
    questionText:string,
    image?:string
}