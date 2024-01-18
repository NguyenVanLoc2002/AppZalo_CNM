import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Layout/Login/index.jsx";
import LoginMobileDevice from "./components/LoginComponents/LoginMobileDevice.jsx";
import LoginForm from "./components/LoginComponents/LoginForm.jsx";
import FogotPassword from "./components/LoginComponents/FogotPassword.jsx";
import MainLayout from "./components/Layout/MainLayout/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/chat" element={<MainLayout />} />
        <Route path="/" element={<Login />}>
          <Route index element={<LoginForm/>} />
          <Route path="mobile" element={<LoginMobileDevice/>}/>
          <Route path="forgot" element={<FogotPassword/>}/>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
