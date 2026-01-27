import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Page and Route component imports
import AdminLogin from "./components/admin/pages/login";
import SetPassword from "./components/admin/pages/setPassword"
import AdminRoutes from "./components/admin/routes/appRoutes";
import Healthroutes from "./components/health/routes/appRoutes1"
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route
        path="/"
        element={
         
            <AdminLogin />
          
        }
      />
      <Route
        path="/set-password/:resetToken"
        element={
         
            <SetPassword />
          
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
