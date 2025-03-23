import React from "react";
import "./App.css";
import AdminPage from "./pages/admin/AdminPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/home/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path="/*" element={<Homepage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
