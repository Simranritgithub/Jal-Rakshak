import { Routes, Route, Navigate } from "react-router-dom";
import EnrollDashboard from "../pages/enrollmentDashboard";
import CreateHealthOfficial from "../pages/createHealthOfficial";
import Awareness from "../pages/awareness";
import Hotspots from "../pages/hotspots";
import Healthdashboard from "../pages/healthDashboard";
import Waterdashboard from "../pages/waterDashboard";
import Alerts from "../pages/alerts";
import Alert from "../pages/alert.jsx";
import ManageLocations from "../pages/manageLocations";
import { LanguageProvider } from "../../../context/languageContext.jsx";
const AdminRoutes = () => {
  return (
    <LanguageProvider>
      {" "}
      <Routes>
        <Route path="enroll" element={<EnrollDashboard />} />
        <Route path="awareness" element={<Awareness />} />
        <Route path="health-reports" element={<Healthdashboard />} />
        <Route path="water-reports" element={<Waterdashboard />} />
        <Route path="Alerts" element={<Alerts />} />

        <Route path="add-official" element={<CreateHealthOfficial />} />
        <Route path="hotspots" element={<Hotspots />} />
        <Route path="manage-locations" element={<ManageLocations />} />
      </Routes>
    </LanguageProvider>
  );
};

export default AdminRoutes;
