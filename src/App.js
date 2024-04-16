import "./App.css";
import Login from "./components/Login";
import RegistrationPage from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ColorPicker from "./components/ColorPicker";
import Footer from "./components/Footer";
// import GameRecord from "./components/GameRecord";
import Home from "./components/Home";
import MidHeader from "./components/MidHeader";
import MainPage from "./components/MainPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route
            path="/ProfilePage"
            element={
              <>
                <ProfilePage />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
