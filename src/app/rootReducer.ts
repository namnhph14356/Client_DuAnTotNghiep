import { combineReducers } from "redux";
import AnswerQuizSlide from "../features/Slide/answerQuiz/AnswerQuizSlide";
import CategorySlide from "../features/Slide/category/CategorySlide";
import CountSlide from "../features/Slide/count/CountSlide";
import ProductSlide from "../features/Slide/product/ProductSlide";
import QuizSlide from "../features/Slide/quiz/QuizSlide";
import History from "../features/Slide/history/History";
import UserQuiz from "../features/Slide/userQuiz/UserQuiz";
import ListenWrite from "../features/Slide/listenWrite/ListenWriteSlice";
import ContactSlide from "../features/Slide/contact/ContactSlide";
import UserListenWriteSlice from "../features/Slide/userListenWrite/UserListenWriteSlice";
import CommentSlice from "../features/Slide/comment/CommentSlice";
import TimeLimitCountdownSlice from "../features/Slide/timeLimitCountdown/timeLimitCountdown";
import ClassSlide from "../features/Slide/class/classSlice";  
import ReplycommentSlide from "../features/Slide/comment/ReplySilce"
import userSlide from "../features/Slide/user/userSlide";
import authSlide from "../features/Slide/auth/authSlide";

import NoteSlice from "../features/Slide/note/NoteSlice";

import MonthSlice from "../features/Slide/month/MonthSlice";
import CourseSlide from "../features/Slide/course/CourseSlide";
import WeekSlice from "../features/Slide/week/WeekSlice";
import DaySlice from "../features/Slide/day/DaySlice";
import PracticeActivitySlice from "../features/Slide/practiceActivity/PracticeActivitySlice";
import LearningProgressSlice from '../features/Slide/learningProgress/LearningProgress'
import GoogleSpeechSlice from "../features/Slide/googleSpeech/GoogleSpeechSlice";
import vocabulary from "../features/Slide/vocabulary/vocabulary";
import sentencesSlice from "../features/Slide/sentences/sentencesSlice";
import grammarSlice from "../features/Slide/grammar/grammarSlice";
import answerListenWrite from "../features/Slide/answerListenWrite/answerListenWrite";

const rootReducer = combineReducers({
    count: CountSlide,
    product: ProductSlide,
    category: CategorySlide,
    quiz: QuizSlide,
    userQuiz: UserQuiz,
    history: History,
    listenWrite: ListenWrite,
    contact: ContactSlide,
    comment: CommentSlice,
    userListenWrite: UserListenWriteSlice,
    answerQuiz: AnswerQuizSlide,
    answerListenWrite: answerListenWrite,
    user: userSlide,
    auth: authSlide,
    time: TimeLimitCountdownSlice,
    class: ClassSlide,
    reply: ReplycommentSlide,
    noteCouse: NoteSlice,
    course: CourseSlide,
    month: MonthSlice,
    week: WeekSlice,
    day: DaySlice,
    practiceActivity: PracticeActivitySlice,
    learningProgress: LearningProgressSlice,
    googleSpeech: GoogleSpeechSlice,
    vocabulary: vocabulary,
    sentences: sentencesSlice,
    grammar: grammarSlice
});

export default rootReducer;