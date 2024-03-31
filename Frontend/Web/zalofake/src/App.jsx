import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";
import Login from "./page/Login";
import LoginForm from "./components/LoginComponents/LoginForm";
import Register from "./components/LoginComponents/Register";
import ForgotPassword from "./components/LoginComponents/ForgotPassword";
import MainLayout from "./page/MainLayout";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <MainLayout /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        >
          <Route index element={<LoginForm />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<ForgotPassword />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
