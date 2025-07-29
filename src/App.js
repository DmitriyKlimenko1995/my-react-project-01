import './App.css';
import ContentContainer from './components/Content/ContentContainer';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Nav from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer';
import Content from './components/Content/Content';
import RegisterForm from './components/Header/AuthReg/RegisterForm';
import LoginForm from './components/Header/AuthReg/LoginForm';
import PrivateRoute from './components/PrivateRouter/PrivateRoute';
import HeaderContainer from './components/Header/HeaderContainer';
import { useEffect, useState } from 'react';
import ChatBox from './components/Dialogs/Chat/ChatBox';
import ChatPath from './components/Dialogs/Chat/ChatPath';
import MyForm from './components/Content/MyForm/MyForm';


function App() {

  const userId = localStorage.getItem('userId');

  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleSubscribe = () => {
    // выполнить подписку
    setRefreshFlag(prev => !prev); // заставит Sidebar перерендериться
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header handleSubscribe={handleSubscribe} />
        <Nav refreshFlag={refreshFlag} />
        <div className='app-wrapper-content'>
          <Routes>
            <Route
              path="/dialogs"
              element={
                <PrivateRoute>
                  <Dialogs />
                </PrivateRoute>} />
            <Route
              path="/content/:id"
              element={
                <PrivateRoute>
                  <ContentContainer />
                </PrivateRoute>} />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UsersContainer refreshFlag={handleSubscribe} />
                </PrivateRoute>} />
            <Route path="/registerform" element={<RegisterForm />} />
            <Route path="/loginform" element={<LoginForm handleSubscribe={handleSubscribe} />} />
            <Route
              path="/chat/:id"
              element={
                <PrivateRoute>
                  <ChatPath handleSubscribe={handleSubscribe} />
                </PrivateRoute>} />
            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <MyForm />
                </PrivateRoute>} />

          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
