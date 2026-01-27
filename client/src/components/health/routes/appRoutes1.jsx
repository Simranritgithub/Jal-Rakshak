import { Routes, Route, Navigate } from "react-router-dom";

import VillageHealthDashboard from "../pages/villageStats";
import HealthCommandCenterDashboard from "../pages/taskStatus";
import AwarenessDashboard from "../pages/awareness";
import ReportLiveCase from "../pages/reportLiveCase";
import Chatbot from '../pages/chatbot';
import AlertsPage from "../pages/alert";
const HealthRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<VillageHealthDashboard />} />
      <Route path="awareness" element={<AwarenessDashboard />} />
      <Route path="task" element={<HealthCommandCenterDashboard />} />
      <Route path="report-live-case" element={<ReportLiveCase/>} />
      <Route path="chatbot" element={<Chatbot/>} />
      <Route path="alert" element={<AlertsPage/>} />
    </Routes>
  );
};

export default HealthRoutes;
