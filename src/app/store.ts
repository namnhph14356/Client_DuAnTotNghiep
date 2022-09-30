import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AnswerQuizSlide from '../features/Slide/answerQuiz/AnswerQuizSlide';
import authSlide from '../features/Slide/auth/authSlide';
import CategorySlide from '../features/Slide/category/CategorySlide';
import CountSlide from '../features/Slide/count/CountSlide';
import ProductSlide from '../features/Slide/product/ProductSlide';
import QuizSlide from '../features/Slide/quiz/QuizSlide';
import History from '../features/Slide/history/History';
import UserQuiz from '../features/Slide/userQuiz/UserQuiz';
import ListenWrite from '../features/Slide/listenWrite/ListenWriteSlice';
import ContactSlide from '../features/Slide/contact/ContactSlide';
import UserListenWriteSlice from '../features/Slide/userListenWrite/UserListenWriteSlice';
import CommentSlice from '../features/Slide/comment/CommentSlice';
import TimeLimitCountdownSlice from '../features/Slide/timeLimitCountdown/timeLimitCountdown';

// import categorySlide from '../features/category/CategorySlide';
// import countSlide from '../features/count/CountSlide'
// import productSlide from '../features/product/ProductSlide'
export const store = configureStore({
  reducer:{
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
    user: authSlide,
    time: TimeLimitCountdownSlice
    // product
    // cart
    // user
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
