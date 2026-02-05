import React from "react";
import { Routes, Route } from "react-router-dom";
import AshaWorkerProfile from "./Profile";
import AshaDashboard from "./AshaDashboard";
import Waterreports from "./Waterreports";
import MyWaterReport from "./MyWaterReport";

const AshaRoutes = () => {
  return (
    <Routes>
      <Route path="profile" element={<AshaWorkerProfile />} />
      <Route path="dashboard" element={<AshaDashboard />} />
      <Route path="water-reports" element={<Waterreports />} />
      <Route path="my/water-reports" element={<MyWaterReport />} />
    </Routes>
  );
};

export default AshaRoutes;
