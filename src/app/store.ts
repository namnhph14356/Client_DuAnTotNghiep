import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AnswerQuizSlide from '../features/Slide/answerQuiz/AnswerQuizSlide';
import authSlide from '../features/Slide/auth/authSlide';
import CategorySlide from '../features/Slide/category/CategorySlide';
import CountSlide from '../features/Slide/count/CountSlide';
import ProductSlide from '../features/Slide/product/ProductSlide';
import QuizSlide from '../features/Slide/quiz/QuizSlide';

// import categorySlide from '../features/category/CategorySlide';
// import countSlide from '../features/count/CountSlide'
// import productSlide from '../features/product/ProductSlide'
export const store = configureStore({
  reducer:{
    count: CountSlide,
    product: ProductSlide,
    category: CategorySlide,
    quiz: QuizSlide,


    answerQuiz: AnswerQuizSlide,
    user: authSlide
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
