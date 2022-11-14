import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import WebsiteLayout from "./pages/layouts/WebsiteLayout";
import Home from "./pages/Home";
import AdminLayout from "./pages/layouts/AdminLayout";
import Welcome from "./pages/Welcome";
import Learning from "./pages/Learning";
import DetailLearning from "./pages/DetailLearning";
import FileUser from "./pages/FileUser";
import SignUp from "./pages/SignUp";
import ExeWriteAndListen from "./containers/Conversation/ExeWriteAndListen";
import ListUser from "./pages/admin/Auth/listUser";
import AddUser from "./pages/admin/Auth/AddUser";
import Store from "./pages/Store";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import List from "./pages/admin/categories/List";
import Add from "./pages/admin/categories/FormCategory";
import User from "./pages/user/User";
import Contact from "./pages/contact/Contact";
import ListQuiz from "./pages/admin/quizz/quiz/ListQuiz";
import FormQuiz from "./pages/admin/quizz/quiz/FormQuiz";
import ListAnswerQuiz from "./pages/admin/quizz/answerQuiz/ListAnswerQuiz";
import FormAnswerQuiz from "./pages/admin/quizz/answerQuiz/FormAnswerQuiz";
import ListUserQuiz from "./pages/admin/quizz/userQuiz/ListUserQuiz";
import FormUserQuiz from "./pages/admin/quizz/userQuiz/FormUserQuiz";
import FormListenWrite from "./pages/admin/ListenWrite/listenWrite/Exercise/FormListenWrite";

// import TeacherPage from './pages/teacher/TeacherPage';
// import ManageTeacher from './pages/teacher/ManagementTeacher';
import CategoryList from "./pages/teacher/category/category";
import AddCategory from "./pages/teacher/category/createCategory";
import AdminTeacher from "./pages/adminTeacher/AdminTeacher";
import AdminLearn from "./pages/adminTeacher/AdminLearn";
import FileTeacher from "./pages/fileTeacher/FileTeacher";

// import AdminTeacher from './pages/adminTeacher/AdminTeacher';
// import AdminLearn from './pages/adminTeacher/AdminLearn';

import TeacherPage from "./pages/TeacherPage";
import AdminLearnAdd from "./pages/adminTeacher/AdminLearnAdd";
import CoursePage from "./pages/CoursePage";
import QuizPage from "./pages/QuizPage";
import ListContact from "./pages/admin/contact/ListContact";
import EditContact from "./pages/admin/contact/EditContact";
import CommentBox from "./pages/comment/Comment";
import TestPage from "./pages/Test";
import TestPage2 from "./pages/Test2";
import ExeQuiz from "./pages/ExeQuiz";
import TeacherLayout from "./pages/layouts/TeacherLayout";
import LessonListTeacher from "./pages/adminTeacher/AdminLearn";
import Grammar from "./pages/Grammar";
import ExerciseVocabAndGrammar from "./pages/ExerciseVocabAndGrammar";
import Dashboard from "./pages/adminTeacher/adminClass/Dashboard";
import AdminClassList from "./pages/adminTeacher/adminClass/AdminClassList";

import Vocabulary from "./pages/Vocabulary";
import ConversationPage from "./pages/ConversationPage";
import ExercisePage from "./pages/ExercisePage";
import SignIn from "./pages/SignIn";
import DetailLearningLayout from "./pages/layouts/DetailLearningLayout";
import SpeakingPage from "./pages/speaking";
import ExeListenAndRead from "./containers/Conversation/ExeListenAndRead";
import Note from "./containers/Note";
import QuestionAnswer from "./containers/QuestionAnswer";
import StartUp from "./containers/Speak/StartUp";
import LessonVocabulary from "./containers/Vocabulary/LessonVocabulary";
import ExerciseVocabulary from "./containers/Vocabulary/ExerciseVocabulary";
import LessonGrammar from "./containers/Grammar/LessonGrammar";
import ExerciseGrammar from "./containers/Grammar/ExerciseGrammar";
import Sentences from "./pages/Sentences";
import LessonSentences from "./containers/Sentences/LessonSentences";
import ExerciseSentences from "./containers/Sentences/ExerciseSentences";
import ExamSentences from "./containers/Sentences/ExamSentences";
import QuizTypeSelect from "./components/quiz/QuizTypeSelect";
import {
  PrivateRouteHomePage,
  PrivateRouteLearning,
} from "./midlerware/PrivateRoute";
import DetailSentence from "./containers/Sentences/DetailSentence";
import ListGrammar from "./pages/admin/grammar/ListGrammar";
import FormGrammar from "./pages/admin/grammar/FormGrammar";
import GoogleSpeech from "./components/GoogleSpeech/GoogleSpeech";
import FormVocabulary from "./pages/admin/Vocabulary/Lesson/Form";
import AddSentencesExercise from "./pages/admin/Sentences/Exercise/Add";
import FormSentencesLesson from "./pages/admin/Sentences/Lesson/AddSentencesLesson";

import OralPage from "./pages/OralPage";
import OralSeven from "./pages/OralSeven";
import DetailClass from "./pages/adminTeacher/adminClass/DetailClass";
import ListSentencesLesson from "./pages/admin/Sentences/Lesson/ListSentencesLesson";
import ListSentencesExercise from "./pages/admin/Sentences/Exercise/ListSentencesExercise";
import DayLayout from "./pages/layouts/DayLayout";
import ListDay from "./pages/admin/Day/ListDay";
import ListListenSpeak from "./pages/admin/listenspeak/ListListenSpeak";
import FormQuestionListenSpeak from "./pages/admin/listenspeak/Question/FormQuestion";
import FormAnswerListenSpeak from "./pages/admin/listenspeak/Answer/FormAnswerAdd";
import FormAnswerListenSpeakEdit from "./pages/admin/listenspeak/Answer/FormAnswerEdit";
import ListExercise from "./pages/admin/grammar/ListExercise";
import FormExercise from "./pages/admin/grammar/FormExercise";
import ExamLayout from "./pages/layouts/ExamLayout";
import FormLessonVocabulary from "./pages/admin/Vocabulary/Exercise/FormExerciseVocabulary";
import FormExerciseVoca from "./pages/admin/Vocabulary/Exercise/FormExerciseVocabulary";
import FormExerciseVocabulary from "./pages/admin/Vocabulary/Exercise/FormExerciseVocabulary";
import ListVocabulary from "./pages/admin/Vocabulary/Lesson/ListVocabulary";
import ListListenWrite from "./pages/admin/ListenWrite/listenWrite/Exercise/ListListenWrite";
import ListListenRead from "./pages/admin/ListenWrite/listenWrite/ListenRead/ListListenRead";
import FormListenRead from "./pages/admin/ListenWrite/listenWrite/ListenRead/FormListenRead";
import FormQuestion from "./pages/admin/grammar/Question/FormQuestion";
import FormAnswerEdit from "./pages/admin/grammar/Answer/FormAnswerEdit";
import FormVocabularyAnswer from "./pages/admin/Vocabulary/Exercise/FormVocabularyAnswer";
import FormVocabularyEdit from "./pages/admin/Vocabulary/Exercise/FormVocabularyEdit";
import FormAnswer from "./pages/admin/grammar/Answer/FormAnswer";
import HistoryUser from "./pages/adminTeacher/adminClass/HistoryUser";
import ListExerciseVocabulary from "./pages/admin/Vocabulary/Exercise/ListExerciseVocabulary";



function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouteHomePage>
              <WebsiteLayout />
            </PrivateRouteHomePage>
          }
        >
          <Route index element={<Home />} />
          <Route path="learning">

            <Route index element={<PrivateRouteLearning><Learning /></PrivateRouteLearning>} />

            <Route path='oral'>
              <Route path=':dayId' element={<ExamLayout />} >
                <Route index element={<OralPage />} />
                <Route path='exam' element={<OralSeven />} />
              </Route>
              {/* <Route path=':dayId' element={<OralPage />} />
              <Route path=':dayId/exam' element={<OralSeven />} /> */}
            </Route>
            <Route path=":dayId/detailLearning">
              <Route index element={<DetailLearning />} />
              <Route path=':id' element={<DetailLearningLayout />}>

                <Route path='listenSpeak' element={<SpeakingPage />}>
                  <Route path='startUp' element={<StartUp />} />
                  <Route path='quiz2' element={<QuizPage />} />
                  <Route path='quiz' element={<QuizTypeSelect />} />
                  <Route path='questionAndAnswer' element={<QuestionAnswer />} />

                </Route>

                <Route path="vocabulary" element={<Vocabulary />}>
                  <Route path="lesson" element={<LessonVocabulary />} />
                  <Route path="exercise" element={<ExerciseVocabulary />} />
                  <Route path="note" element={<Note />} />
                  <Route
                    path="questionAndAnswer"
                    element={<QuestionAnswer />}
                  />
                </Route>

                <Route path="sentences" element={<Sentences />}>
                  <Route path="lesson">
                    <Route index element={<LessonSentences />} />
                    <Route
                      path=":idDetailSentence"
                      element={<DetailSentence />}
                    />
                  </Route>
                  <Route path="exercise" element={<ExerciseSentences />} />
                  <Route path="exam" element={<ExamSentences />} />
                  <Route path="note" element={<Note />} />
                  <Route
                    path="questionAndAnswer"
                    element={<QuestionAnswer />}
                  />
                </Route>

                <Route path="conversation" element={<ConversationPage />}>
                  <Route path="listenWrite" element={<ExeWriteAndListen />} />
                  <Route path="listenRead" element={<ExeListenAndRead />} />
                  <Route path="note" element={<Note />} />
                  <Route
                    path="questionAndAnswer"
                    element={<QuestionAnswer />}
                  />
                </Route>

                <Route path="grammar" element={<Grammar />}>
                  <Route path="lesson" element={<LessonGrammar />} />
                  <Route path="exercise" element={<ExerciseGrammar />} />
                  <Route path="note" element={<Note />} />
                  <Route
                    path="questionAndAnswer"
                    element={<QuestionAnswer />}
                  />
                </Route>

                <Route path="exercise" element={<ExercisePage />} />
              </Route>
            </Route>
          </Route>

          <Route path="contact" element={<Contact />} />
          <Route path="comment" element={<CommentBox />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="fileuser" element={<FileUser />} />
          <Route path="user" element={<User />} />
          <Route path="store" element={<Store />} />
          <Route path="teacher" element={<TeacherPage />} />
        </Route>

        <Route path="manageteacher" element={<TeacherLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="class" element={<AdminClassList />} />
          <Route path="class/detail/:id" element={<DetailClass />} />
          <Route path="class/history/:userId" element={<HistoryUser />} />
          <Route path="learn">
            <Route index element={<LessonListTeacher />} />
            <Route path="add" element={<AdminLearnAdd />} />
          </Route>
          <Route path="category">
            <Route index element={<CategoryList />} />
            <Route path="add" element={<AddCategory />} />
          </Route>
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="category" />} />
          <Route path="category">
            <Route index element={<List />} />
            <Route path="add" element={<Add />} />
            <Route path="edit/:id" element={<Add />} />
          </Route>

          <Route path="contact">
            <Route index element={<ListContact />} />
            <Route path="edit/:id" element={<EditContact />} />
          </Route>

          <Route path="user">
            <Route index element={<ListUser />} />
            <Route path="add" element={<AddUser />} />
          </Route>

          {/* quizz */}
          <Route path="quiz">
            <Route index element={<ListQuiz />} />
            <Route path="add" element={<FormQuiz />} />
            <Route path=":id/edit" element={<FormQuiz />} />
          </Route>

          <Route path="answerQuiz">
            <Route index element={<ListAnswerQuiz />} />
            <Route path="add" element={<FormAnswerQuiz />} />
            <Route path=":id/edit" element={<FormAnswerQuiz />} />
          </Route>

          <Route path="userQuiz">
            <Route index element={<ListUserQuiz />} />
            <Route path="add" element={<FormUserQuiz />} />
            <Route path=":id/edit" element={<FormUserQuiz />} />
          </Route>

          <Route path="day">
            <Route index element={<ListDay />} />
          </Route>
        </Route>

        {/* ---Day Manage */}
        <Route path="manageDay/:dayId" element={<DayLayout />}>
          <Route index element={<Navigate to="listenspeak" />} />

          <Route path='listenspeak' >
            <Route index element={<ListListenSpeak />} />
            <Route path="question">
              <Route path="add" element={<FormQuestionListenSpeak />} />
              <Route path=":id/edit" element={<FormQuestionListenSpeak />} />
            </Route>
            <Route path="answer">
              <Route path=":id/add" element={<FormAnswerListenSpeak />} />
              <Route path=":id/edit" element={<FormAnswerListenSpeakEdit />} />
            </Route>
          </Route>

          <Route path="vocabulary">
            <Route index element={<Navigate to="listLesson" />} />
            <Route path="listLesson" element={<ListVocabulary />} />
            <Route path="addLesson" element={<FormVocabulary />} />
            <Route path=":id/editLesson" element={<FormVocabulary />} />

            <Route path="addExercise" element={<FormExerciseVocabulary />} />
            <Route path="listExercise" element={<ListExerciseVocabulary />} />
            <Route path=":id/editExercise" element={<FormExerciseVocabulary />} />

            <Route path=":id/addExerciseAnswer" element={<FormVocabularyAnswer />} />
            <Route path=":id/editExerciseAnswer" element={<FormVocabularyEdit />} />

          </Route>

          <Route path="sentences">
            <Route index element={<Navigate to="listLesson" />} />
            <Route path="listLesson" element={<ListSentencesLesson />} />
            <Route path="addLesson" element={<FormSentencesLesson />} />
            <Route path=":id/editLesson" element={<FormSentencesLesson />} />

            <Route path="listExercise" element={<ListSentencesExercise />} />
            <Route path="addExercise" element={<AddSentencesExercise />} />
            <Route path=":id/editExercise" element={<AddSentencesExercise />} />
          </Route>

          {/* listenWrite */}
          <Route path="conversation">
            <Route index element={<Navigate to="listExercise" />} />
            <Route path="listExercise" element={<ListListenWrite />} />
            <Route path="addExercise" element={<FormListenWrite />} />
            <Route path=":id/editExercise" element={<FormListenWrite />} />

            <Route path="listListenRead" element={<ListListenRead />} />
            <Route path="addListenRead" element={<FormListenRead />} />
            <Route path=":id/editListenRead" element={<FormListenRead />} />

          </Route>

          <Route path="grammar">
            <Route index element={<Navigate to="listLesson" />} />
            <Route path="listLesson" element={<ListGrammar />} />
            <Route path="addLesson" element={<FormGrammar />} />
            <Route path=":id/editLesson" element={<FormGrammar />} />


            <Route path="question">
              <Route path="add" element={<FormQuestion />} />
              <Route path=":id/edit" element={<FormQuestion />} />
            </Route>
            <Route path="answer">
              <Route path=":id/add" element={<FormAnswer />} />
              <Route path=":id/edit" element={<FormAnswerEdit />} />
            </Route>

            <Route path="listExercise" element={<ListExercise />} />
            {/* <Route path="addExercise" element={<FormExercise />} />
            <Route path=":id/addExercise" element={<FormExercise />} /> */}
          </Route>
        </Route>

        <Route path="/ggspeech" element={<GoogleSpeech />}>
          {" "}
        </Route>
        <Route path="/test" element={<TestPage />}>
          {" "}
        </Route>
        <Route path="/test2" element={<TestPage2 />}>
          {" "}
        </Route>
        <Route path="/signin" element={<SignIn />}>
          {" "}
        </Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/newPassword/:email" element={<NewPassword />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
      </Routes>

    </div>
  );
}

export default App;
