import React from "react";
import { Routes, Route } from "react-router-dom";
import AshaWorkerProfile from "./Profile";


const AshaRoutes = () => {
  return (
    <Routes>
      <Route path="profile" element={<AshaWorkerProfile />} />
     
    </Routes>
  );
};

export default AshaRoutes;
