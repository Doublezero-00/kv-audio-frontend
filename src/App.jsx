import React from "react";
import "./App.css";
import AdminPage from "./pages/admin/AdminPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/home/HomePage";
import LoginPage from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/login/register/register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyEmail from "./pages/verifyEmail/verifyEmail";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/*" element={<Homepage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
