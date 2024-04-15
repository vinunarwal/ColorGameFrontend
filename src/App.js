import './App.css';
import Login from './components/Login';
import RegistrationPage from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ColorPicker from "./components/ColorPicker";
import Footer from "./components/Footer";
// import GameRecord from "./components/GameRecord";
import Home from "./components/Home";
import MidHeader from "./components/MidHeader";
import MainPage from './components/MainPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/main' element={<MainPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
