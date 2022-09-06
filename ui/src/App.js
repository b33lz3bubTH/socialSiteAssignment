import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router, useNavigate,
} from "react-router-dom";

import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import ProfilePage from './pages/profilePage';
function App() {
  return (
    <Router>
      <div className="App">
        {/*  */}
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
