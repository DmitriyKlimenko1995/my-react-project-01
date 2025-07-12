import './App.css';
import Content from './components/Content/Content';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Nav from './components/Navbar/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer';
import Users from './components/Users/Users';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Nav />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path="/dialogs" element={<Dialogs />} />
            <Route path="/content" element={<Content />} />
            <Route path="/users" element={<UsersContainer />} />
          </Routes>
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
