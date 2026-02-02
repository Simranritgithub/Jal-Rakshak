import React from "react";
import { Routes, Route } from "react-router-dom";
import AshaWorkerProfile from "./Profile";
import AshaDashboard from "./AshaDashboard";
import Waterreports from "./Waterreports";


const AshaRoutes = () => {
  return (
    <Routes>
      <Route path="profile" element={<AshaWorkerProfile />} />
     <Route path="/dashboard" element={<AshaDashboard />} />
     <Route path="/water-reports" element={<Waterreports />} />
    </Routes>
  );
};

export default AshaRoutes;
