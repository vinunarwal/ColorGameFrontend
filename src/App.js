import "./App.css";
import Login from "./components/Login";
import RegistrationPage from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./components/MainPage";
import ProfilePage from "./components/ProfilePage";
import Recharge from "./components/Recharge"
import Address from "./components/Address";
import AddAddress from "./components/AddAddress";
import AdminPanel from "./Admin/AdminPanel";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/Address" element={<Address />} />
          <Route path="/AddAddress" element={<AddAddress />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
