import React from "react";
import "./App.css";
import AdminPage from "./pages/admin/AdminPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/home/HomePage";
import LoginPage from "./pages/login/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes path="/*">
        <Route path="/*" element={<Homepage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
