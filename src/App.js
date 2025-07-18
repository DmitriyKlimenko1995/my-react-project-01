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


function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Nav />
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
                  <UsersContainer />
                </PrivateRoute>} />
            <Route path="/registerform" element={<RegisterForm />} />
            <Route path="/loginform" element={<LoginForm />} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
