
import React, { createContext, useState } from 'react';
import  './css/home.css'; 
import  './css/footer.css'; 
import  './css/header.css'; 
import  './css/welcome.css'; 
import  './css/learning.css'; 
import  './css/detailLearning.css'; 
import  './css/signin.css'; 
import  './css/signup.css'; 
import './css/quiz.css';
import './css/speaking.css';
import './css/listen.css';
import "toastr/build/toastr.min.css";
import "./css/paypal.css"
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import WebsiteLayout from './pages/layouts/WebsiteLayout';
import Home from './pages/Home';
import AdminLayout from './pages/layouts/AdminLayout';
// import List from './Admin/categories/List';
import Welcome from './pages/Welcome';
import Learning from './pages/Learning';
import DetailLearning from './pages/DetailLearning';
// import Contact from './pages/Contact';
import FileUser from './pages/FileUser';
// import User from './pages/User';


// import Login from './Component/user/Login';
import SignUp from './Component/user/SignUp';
import ThongKe from './Component/user/ThongKe';
import ExeQuiz from './pages/ExeQuiz';
import ExeSpeak from './pages/ExeSpeak';
import ExeWriteAndListen from './pages/ExeWriteAndListen';
import Login from './Component/user/Login';
// import Add from './Admin/categories/Add';
import toastr from "toastr";
// import Add from './features/Admin/categories/Add';
// import Edit from './features/Admin/categories/Edit';
// import List from './features/Admin/categories/List';
import ListUser from './features/Admin/Auth/listUser';
import AddUser from './features/Admin/Auth/AddUser';
// import Edit from './Admin/categories/Edit';
import Store from './pages/Store';
import ForgotPassword from './Component/user/ForgotPassword';
import NewPassword from './Component/user/NewPassword'; 
import List from './pages/admin/categories/List';
import Add from './pages/admin/categories/Add';
import Edit from './pages/admin/categories/Edit';
import User from './pages/user/User';
import Contact from './pages/contact/Contact';
import ListQuiz from './pages/admin/quiz/ListQuiz';
import FormQuiz from './pages/admin/quiz/FormQuiz';

import ListAnswerQuiz from './pages/admin/answerQuiz/ListAnswerQuiz';
import FormAnswerQuiz from './pages/admin/answerQuiz/FormAnswerQuiz';
import ListUserQuiz from './pages/admin/userQuiz/ListUserQuiz';
import FormUserQuiz from './pages/admin/userQuiz/FormUserQuiz';
import CheckoutPaypal from './pages/CheckoutPaypal';
import Success from './pages/paymentConfirm/success';
import Error from './pages/paymentConfirm/error';
import ChangeColorBG from './Component/ChangeColorBG';
import ListWellcome from './pages/admin/wellCome/listWellcome';
import ReactSwitch from 'react-switch';
import { isTheme } from './utils/localStoreR';
import ListVocabulary from './pages/admin/Vocabulary/ListVocabulary';
import FormVocabulary from './pages/admin/Vocabulary/Form';

export const ThemeContext:any = createContext(null)
function App() {
  
 const themeStore = isTheme();
  return (
  
    <div >
      <Routes>
        
        <Route path='/' element={<WebsiteLayout />}>
          <Route index element={<Home />} />
          <Route path='learning' element={<Learning/>} />
          <Route path='detailLearning' element={<DetailLearning/>} />
          <Route path='detailLearning/quiz' element={<ExeQuiz/>}/>
          <Route path='detailLearning/speak' element={<ExeSpeak/>}/>
          <Route path='detailLearning/writeAndListen' element={<ExeWriteAndListen/>}/>
          <Route path="contact" element={<Contact />}/>
          <Route path="fileuser" element={<FileUser />}/>
          <Route path="user" element={<User />}/>
          <Route path='store' element={<Store />} />
        </Route>


        <Route path='admin' element={<AdminLayout />}>
          <Route index element={<Navigate to="category" />} />
          <Route path="category" >
            <Route index element={<List />} />
            <Route path='add' element={<Add />} />
            <Route path='edit/:id' element={<Edit />} />
          </Route>
          
          <Route path="user" >
            <Route index element={<ListUser />} />
            <Route path='add' element={<AddUser />} />
            <Route path='edit/:id' element={<Edit />} />
          </Route>

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

          <Route path='wellcome'>
            <Route index element={<ListWellcome />}/>
          </Route>

          <Route path='vocabulary'>
            <Route index element={<ListVocabulary />} />
            <Route path='add' element={<FormVocabulary />} />
            <Route path=':id/edit' element={<FormVocabulary />} />
          </Route>
        </Route>
            <Route path='/payment' element={<CheckoutPaypal />} />
            <Route path='/success' element={<Success />} />
            <Route path='/cancle' element={<Error />} />
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/newPassword/:email' element={<NewPassword />}></Route>
        <Route path='/welcome' element={<Welcome />}></Route>
        
      </Routes>



    </div>
  );
}

export default App;


