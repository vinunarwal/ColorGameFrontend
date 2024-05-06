import "./App.css";
import Login from "./components/Login";
import RegistrationPage from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./components/MainPage";
import ProfilePage from "./components/ProfilePage";
import Complaints from "./components/Complaints";
import Recharge from "./components/Recharge"
import Address from "./components/Address";
import AddAddress from "./components/AddAddress";
import AdminPanel from "./Admin/AdminPanel";
import Withdrawl from "./components/Withdrawl";
// import Withdrawal from "./components/Withdrawal";
import Win from "./components/Win";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/complaints" element={<Complaints/>} />
          <Route path="/recharge" element={<Recharge />} />
          {/* <Route path="/withdrawal" element={<Withdrawal />} /> */}
          <Route path="/Address" element={<Address />} />
          <Route path="/AddAddress" element={<AddAddress />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route path="/withdraw" element={ <Withdrawl /> } />
          <Route path="/win" element ={ <Win />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
