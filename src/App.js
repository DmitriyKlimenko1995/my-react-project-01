import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Nav from './components/Navbar';
import Content from './components/Content';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Nav />
      <Content />
    </div>
  );
}

export default App;
