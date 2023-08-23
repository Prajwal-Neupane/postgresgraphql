import React from "react";

import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import { Login } from "./components/Login";
import Hello from "./components/Hello";
import Users from "./components/Users";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
