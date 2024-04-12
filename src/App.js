import './App.css';
import Login from './components/Login';
import RegistrationPage from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<RegistrationPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
