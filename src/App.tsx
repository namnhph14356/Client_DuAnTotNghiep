
import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import WebsiteLayout from './pages/layouts/WebsiteLayout';
import Home from './pages/Home';
import AdminLayout from './pages/layouts/AdminLayout';
import Welcome from './pages/Welcome';
import Learning from './pages/Learning';
import DetailLearning from './pages/DetailLearning';
import FileUser from './pages/FileUser';
import SignUp from './pages/SignUp';
import ExeWriteAndListen from './containers/Conversation/ExeWriteAndListen';
import Login from './pages/Login';
import ListUser from './pages/admin/Auth/listUser';
import AddUser from './pages/admin/Auth/AddUser';
import Store from './pages/Store';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import List from './pages/admin/categories/List';
import Add from './pages/admin/categories/FormCategory';
import User from './pages/user/User';
import Contact from './pages/contact/Contact';
import ListQuiz from './pages/admin/quizz/quiz/ListQuiz';
import FormQuiz from './pages/admin/quizz/quiz/FormQuiz';
import ListAnswerQuiz from './pages/admin/quizz/answerQuiz/ListAnswerQuiz';
import FormAnswerQuiz from './pages/admin/quizz/answerQuiz/FormAnswerQuiz';
import ListUserQuiz from './pages/admin/quizz/userQuiz/ListUserQuiz';
import FormUserQuiz from './pages/admin/quizz/userQuiz/FormUserQuiz';
import FormListenWrite from './pages/admin/ListenWrite/listenWrite/FormListenWrite';
import ListListenWrite from './pages/admin/ListenWrite/listenWrite/ListListenWrite';

// import TeacherPage from './pages/teacher/TeacherPage';
// import ManageTeacher from './pages/teacher/ManagementTeacher';
import CategoryList from './pages/teacher/category/category';
import AddCategory from './pages/teacher/category/createCategory';
import AdminTeacher from './pages/adminTeacher/AdminTeacher';
import AdminLearn from './pages/adminTeacher/AdminLearn';
import FileTeacher from './pages/fileTeacher/FileTeacher';

// import AdminTeacher from './pages/adminTeacher/AdminTeacher';
// import AdminLearn from './pages/adminTeacher/AdminLearn';

import TeacherPage from './pages/TeacherPage';
import AdminLearnAdd from './pages/adminTeacher/AdminLearnAdd';
import CoursePage from './pages/CoursePage';
import QuizPage from './pages/QuizPage';
import ListContact from './pages/admin/contact/ListContact';
import EditContact from './pages/admin/contact/EditContact';
import CommentBox from './pages/comment/Comment';
import TestPage from './pages/Test';
import TestPage2 from './pages/Test2';
import ExeQuiz from './pages/ExeQuiz';
import TeacherLayout from './pages/layouts/TeacherLayout';
import LessonListTeacher from './pages/adminTeacher/AdminLearn';
import Grammar from './pages/Grammar';
import ExerciseVocabAndGrammar from './pages/ExerciseVocabAndGrammar';
import Vocabulary from './pages/Vocabulary';
import ConversationPage from './pages/ConversationPage';
import ExercisePage from './pages/ExercisePage';
import SignIn from './pages/Login';
import DetailLearningLayout from './pages/layouts/DetailLearningLayout';
import SpeakingPage from './pages/speaking';
import ExeListenAndRead from './containers/Conversation/ExeListenAndRead';
import Note from './containers/Note';
import QuestionAnswer from './containers/QuestionAnswer';
import StartUp from './containers/Speak/StartUp';
import LessonVocabulary from './containers/Vocabulary/LessonVocabulary';
import ExerciseVocabulary from './containers/Vocabulary/ExerciseVocabulary';
import LessonGrammar from './containers/Grammar/LessonGrammar';
import ExerciseGrammar from './containers/Grammar/ExerciseGrammar';
import Sentences from './pages/Sentences';
import LessonSentences from './containers/Sentences/LessonSentences';
import ExerciseSentences from './containers/Sentences/ExerciseSentences';
import ExamSentences from './containers/Sentences/ExamSentences';
import Update from './containers/Note/update';

function App() {
  return (
    <div >
      <Routes>

        <Route path='/' element={<WebsiteLayout />}>
          <Route index element={<Home />} />
          <Route path="learning">
            <Route index element={<Learning />} />
            <Route path="detailLearning">
              <Route index element={<DetailLearning />} />
              <Route path=':id' element={<DetailLearningLayout />}>

                <Route path='speak' element={<SpeakingPage />}>
                  <Route path='startUp' element={<StartUp />} />
                  <Route path='questionAndAnswer' element={<QuestionAnswer />} />
                </Route>

                <Route path='vocabulary' element={<Vocabulary />}>
                  <Route path='lesson' element={<LessonVocabulary />} />
                  <Route path='exercise' element={<ExerciseVocabulary />} />
                  <Route path='note' element={<Note />} />
                  <Route path='questionAndAnswer' element={<QuestionAnswer />} />
                </Route>

                <Route path='sentences' element={<Sentences />}>
                  <Route path='lesson' element={<LessonSentences />} />
                  <Route path='exercise' element={<ExerciseSentences />} />
                  <Route path='exam' element={<ExamSentences />} />
                  <Route path='note' element={<Note />} />
                  <Route path='questionAndAnswer' element={<QuestionAnswer />} />
                </Route>

                <Route path='conversation' element={<ConversationPage />}>
                  <Route path='listenWrite' element={<ExeWriteAndListen />} />
                  <Route path='listenRead' element={<ExeListenAndRead />} />
                  <Route path='note' element={<Note />} />
                  <Route path='questionAndAnswer' element={<QuestionAnswer />} />
                </Route>

                <Route path='grammar' element={<Grammar />}>
                  <Route path='lesson' element={<LessonGrammar />} />
                  <Route path='exercise' element={<ExerciseGrammar />} />
                  <Route path='note' element={<Note />} />
                  <Route path='questionAndAnswer' element={<QuestionAnswer />} />
                </Route>

                <Route path='exercise' element={<ExercisePage />} />
              </Route>
            </Route>
          </Route>

          <Route path="contact" element={<Contact />} />
          <Route path="comment" element={<CommentBox />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="fileuser" element={<FileUser />} />
          <Route path="user" element={<User />} />
          <Route path='store' element={<Store />} />
          <Route path='teacher' element={<TeacherPage />} />

        </Route>
        <Route path='menageteacher' element={<TeacherLayout />}>
          <Route index element={<LessonListTeacher />} />
          <Route path='add' element={<AdminLearnAdd />} />
          {/* <Route path="list" >
            <Route index element={<LessonListTeacher />} />
            <Route path='add' element={<AdminLearnAdd />} />
          </Route> */}
          <Route path="category" >
            <Route index element={<CategoryList />} />
            <Route path='add' element={<AddCategory />} />
          </Route>
        </Route>

        <Route path='admin' element={<AdminLayout />}>

          <Route index element={<Navigate to="category" />} />
          <Route path="category" >
            <Route index element={<List />} />
            <Route path='add' element={<Add />} />
            <Route path='edit/:id' element={<Add />} />
          </Route>

          <Route path="contact" >
            <Route index element={<ListContact />} />
            <Route path='edit/:id' element={<EditContact />} />
          </Route>

          <Route path="contact" >
            <Route index element={<ListContact />} />
            <Route path='edit/:id' element={<EditContact />} />
          </Route>

          <Route path="contact" >
            <Route index element={<ListContact />} />
            <Route path='edit/:id' element={<EditContact />} />
          </Route>

          <Route path="user" >
            <Route index element={<ListUser />} />
            <Route path='add' element={<AddUser />} />
          </Route>

          {/* quizz */}
          <Route path="quiz" >
            <Route index element={<ListQuiz />} />
            <Route path='add' element={<FormQuiz />} />
            <Route path=':id/edit' element={<FormQuiz />} />
          </Route>

          <Route path="answerQuiz" >
            <Route index element={<ListAnswerQuiz />} />
            <Route path='add' element={<FormAnswerQuiz />} />
            <Route path=':id/edit' element={<FormAnswerQuiz />} />
          </Route>

          <Route path="userQuiz" >
            <Route index element={<ListUserQuiz />} />
            <Route path='add' element={<FormUserQuiz />} />
            <Route path=':id/edit' element={<FormUserQuiz />} />
          </Route>


          {/* listenWrite */}
          <Route path="listenWrite" >
            <Route index element={<ListListenWrite />} />
            <Route path='add' element={<FormListenWrite />} />
            <Route path=':id/edit' element={<FormListenWrite />} />
          </Route>

        </Route>
        <Route path='/test' element={<TestPage />}> </Route>
        <Route path='/test2' element={<TestPage2 />}> </Route>

        <Route path='sigin' element={<SignIn />}> </Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/newPassword/:email' element={<NewPassword />}></Route>
        <Route path='/welcome' element={<Welcome />}></Route>
      </Routes>
    </div>
  );
}

export default App;


