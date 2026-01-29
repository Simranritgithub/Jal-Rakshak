import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Page and Route component imports
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import SetPassword from "./components/admin/pages/setPassword"
import AdminRoutes from "./components/admin/routes/appRoutes";
import Healthroutes from "./components/health/routes/appRoutes1"

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Register/>} />
      <Route
        path="/login"
        element={
         
            <Login />
          
        }
      />
      {/* Admin Protected Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/health/*" element={<Healthroutes />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
