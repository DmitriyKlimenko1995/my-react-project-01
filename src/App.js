import './App.css';
import Content from './components/Content/Content';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Nav from './components/Navbar/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Nav state={props.state} />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path="/dialogs" element={<Dialogs state={props.state} />} />
            <Route path="/content" element={<Content state={props.state} addPost={props.addPost} updateNewPostText={props.updateNewPostText} />} />
          </Routes>
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
