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
import userSlide from "../features/Slide/user/userSlide";
import authSlide from "../features/Slide/auth/authSlide";
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
    user: userSlide,
    auth: authSlide,
    time: TimeLimitCountdownSlice,
    class: ClassSlide,
});

export default rootReducer;