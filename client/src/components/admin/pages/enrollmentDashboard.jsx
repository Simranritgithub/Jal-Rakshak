// import React, { useState, useEffect, useMemo } from "react";
// import axios from "../../../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../sidebar";
// import { useLanguage } from "../../../context/languageContext.jsx";
// import LanguageToggle from "../../languageToggle.jsx";
// import {
//   LayoutDashboard,
//   Droplets,
//   Bell,
//   FileText,
//   Megaphone,
//   MapPin,
//   CircleHelp,
// } from "lucide-react";
// // SVG Icon Components remain the same...
// const EnrollmentIcon = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     {" "}
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//     />{" "}
//   </svg>
// );
// const WaterReportsIcon = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     {" "}
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
//     />{" "}
//   </svg>
// );
// const AlertsIcon = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     {" "}
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//     />{" "}
//   </svg>
// );
// const HealthReportsIcon = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     {" "}
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//     />{" "}
//   </svg>
// );
// const AwarenessProgramsIcon = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     {" "}
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.353a1.76 1.76 0 013.417-.592V5.882z"
//     />{" "}
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M11 5.882a1.76 1.76 0 012.592-.592l6.353 2.147a1.76 1.76 0 01.592 3.417l-6.353 2.147a1.76 1.76 0 01-2.592-.592V5.882z"
//     />{" "}
//   </svg>
// );
// const HotspotsIcon = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     {" "}
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//     />{" "}
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//     />{" "}
//   </svg>
// );
// const HelpIcon = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     {" "}
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//     />{" "}
//   </svg>
// );

// // Stat Card Component
// const StatCard = ({ title, value }) => (
//   <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//     <p className="text-sm text-gray-500 mb-2">{title}</p>
//     <p className="text-4xl font-bold text-gray-800">{value.toLocaleString()}</p>
//   </div>
// );

// // Dynamic Filter Dropdown Component
// // --- CORRECTION: Pass 't' function as a prop to translate the "All" option ---
// const FilterDropdown = ({ allTextKey, options, value, onChange, t }) => (
//   <div className="relative">
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="appearance-none bg-white py-2 pl-3 pr-8 rounded-md border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//     >
//       {/* --- CORRECT USAGE: Translate the entire phrase using a single key --- */}
//       <option value="">{t(allTextKey)}</option>

//       {options.map((option) => (
//         <option key={option.id} value={option.id}>
//           {option.name}
//         </option>
//       ))}
//     </select>
//     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//       <svg
//         className="fill-current h-4 w-4"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//       >
//         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//       </svg>
//     </div>
//   </div>
// );
// const baseNavItems = [
//   { key: "enrollment", icon: LayoutDashboard, path: "/admin/enroll" },
//   { key: "waterReports", icon: Droplets, path: "/admin/water-reports" },
//   { key: "alerts", icon: Bell, path: "/admin/alerts" },
//   { key: "healthReports", icon: FileText, path: "/admin/health-reports" },
//   { key: "awarenessPrograms", icon: Megaphone, path: "/admin/awareness" },
//   { key: "hotspots", icon: MapPin, path: "/admin/hotspots" },
//   { key: "manageLocations", icon: MapPin, path: "/admin/manage-locations" },
// ];

// // Main Content Component
// const DashboardContent = () => {
//   const { t } = useLanguage();
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({});
//   const [healthOfficials, setHealthOfficials] = useState([]);
//   const [approvalRequests, setApprovalRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for filters
//   const [allStates, setAllStates] = useState([]);
//   const [allVillages, setAllVillages] = useState([]);
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedVillage, setSelectedVillage] = useState("");
//   const translatedNavItems = baseNavItems.map((item) => ({
//     ...item, // Keep the key, icon, and path
//     name: t(`sidebar:${item.key}`), // Add the translated name
//   }));

//   // 3. Get the translated help text
//   const translatedHelpText = t("sidebar:help");
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const params = {};
//         if (selectedState) params.stateId = selectedState;
//         if (selectedVillage) params.villageId = selectedVillage;

//         if (allStates.length === 0) {
//           const [statesRes, villagesRes] = await Promise.all([
//             axios.get("/location/states"),
//             axios.get("/location/villages"),
//           ]);
//           setAllStates(statesRes.data);
//           setAllVillages(villagesRes.data);
//         }

//         const [dashboardRes, ashaRes, volunteerRes] = await Promise.all([
//           axios.get("/enroll/dashboard", { params }),
//           axios.get("/enroll/pending/asha-workers", { params }),
//           axios.get("/enroll/pending/volunteers", { params }),
//         ]);

//         if (dashboardRes?.data) {
//           setStats(dashboardRes.data.data.stats || {});
//           setHealthOfficials(dashboardRes.data.data.healthOfficials || []);
//         }

//         const pendingAsha = (ashaRes?.data || []).map((item) => ({
//           id: item.user.id,
//           name: item.user.name,
//           role: "ASHA Worker",
//           village: item.village?.name || "N/A", // Use village.name
//         }));

//         const pendingVolunteers = (volunteerRes?.data || []).map((item) => ({
//           id: item.user.id,
//           name: item.user.name,
//           role: "Volunteer",
//           village: item.village?.name || "N/A", // Use village.name
//         }));

//         const combinedRequests = [...pendingAsha, ...pendingVolunteers];
//         combinedRequests.sort((a, b) =>
//           (a.name || "").localeCompare(b.name || "")
//         );
//         setApprovalRequests(combinedRequests);
//       } catch (err) {
//         console.error("Failed to fetch dashboard data:", err);
//         setError("Could not load dashboard data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedState, selectedVillage]);

//   const filteredVillages = useMemo(() => {
//     if (!selectedState) return allVillages;
//     return allVillages.filter((village) => village.stateId === selectedState); // Example of actual filtering
//   }, [selectedState, allVillages]);

//   if (loading && allStates.length === 0) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-xl text-gray-500">{t("common:loading")}</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-xl text-red-500 bg-red-100 p-4 rounded-lg">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <main className="flex-1 p-8 bg-gray-50/50 overflow-y-auto">
//       <header className="mb-8">
//         <div className="flex justify-between items-start">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-800">
//               {t("dashboard:dashboardTitle")}
//             </h2>
//             <div className="flex items-center space-x-4 mt-4">
//               <FilterDropdown
//                 t={t}
//                 allTextKey="common:allStates" // <-- Pass the key for the whole phrase
//                 options={allStates}
//                 value={selectedState}
//                 onChange={(value) => {
//                   setSelectedState(value);
//                   setSelectedVillage("");
//                 }}
//               />
//               <FilterDropdown
//                 t={t}
//                 allTextKey="common:allVillages" // <-- Pass the key for the whole phrase
//                 options={filteredVillages}
//                 value={selectedVillage}
//                 onChange={setSelectedVillage}
//               />
//             </div>
//           </div>
//           <LanguageToggle />
//         </div>
//       </header>

//       {loading ? (
//         <div className="text-center py-10 text-gray-500">Updating data...</div>
//       ) : (
//         <>
//           {/* Stats Section */}
//           <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <StatCard
//               title={t("dashboard:ashaWorkers")}
//               value={stats.ashaWorkers || 0}
//             />
//             <StatCard
//               title={t("dashboard:registeredVillagers")}
//               value={stats.registeredVillagers || 0}
//             />
//             <StatCard
//               title={t("dashboard:volunteersAvailable")}
//               value={stats.volunteersAvailable || 0}
//             />
//             <StatCard
//               title={t("dashboard:totalRegisteredUsers")}
//               value={stats.totalRegisteredUsers || 0}
//             />
//           </section>

//           {/* Health Officials Table */}
//           <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {t("dashboard:healthOfficialsTitle")}
//               </h3>
//               <div className="flex space-x-3">
//                 <button
//                   className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//                   onClick={() => navigate("/admin/add-official")}
//                 >
//                   {t("dashboard:addOfficialBtn")}
//                 </button>
//               </div>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     {/* --- CORRECTION: Use t function for table headers --- */}
//                     <th className="p-4 text-sm font-medium text-gray-500">
//                       {t("common:name")}
//                     </th>
//                     <th className="p-4 text-sm font-medium text-gray-500">
//                       {t("dashboard:state")}
//                     </th>
//                     <th className="p-4 text-sm font-medium text-gray-500">
//                       {t("dashboard:region")}
//                     </th>
//                     <th className="p-4 text-sm font-medium text-gray-500">
//                       {t("common:status")}
//                     </th>
//                     <th className="p-4 text-sm font-medium text-gray-500">
//                       {t("common:actions")}
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {healthOfficials.length > 0 ? (
//                     healthOfficials.map((official) => (
//                       <tr
//                         key={official.id}
//                         className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50"
//                       >
//                         <td className="p-4 font-medium text-gray-800">
//                           {official.name}
//                         </td>
//                         <td className="p-4 text-gray-600">
//                           {official.region?.state?.name || "N/A"}
//                         </td>
//                         <td className="p-4 text-gray-600">
//                           {official.region?.name || "N/A"}
//                         </td>
//                         <td className="p-4">
//                           <span
//                             className={`px-3 py-1 text-xs font-medium rounded-full ${
//                               official.status === "ACTIVE"
//                                 ? "text-green-700 bg-green-100"
//                                 : "text-gray-700 bg-gray-200"
//                             }`}
//                           >
//                             {official.status}
//                           </span>
//                         </td>
//                         <td className="p-4">
//                           <button className="text-purple-600 hover:underline font-medium text-sm">
//                             {/* --- CORRECTION: Use t function for button text --- */}
//                             {t("common:viewDetails")}
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="text-center p-4 text-gray-500">
//                         No health officials found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </section>

//           {/* Approval Requests Table */}
//           <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//               {t("dashboard:approvalRequestsTitle")}
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     {/* --- CORRECTION: Use t function for table headers --- */}
//                     <th className="p-4 text-sm font-medium text-gray-500">
//                       {t("common:name")}
//                     </th>
//                     <th className="p-4 text-sm font-medium text-gray-500">
//                       {t("dashboard:role")}
//                     </th>
//                     <th className="p-4 text-sm font-medium text-gray-500">
//                       {t("dashboard:village")}
//                     </th>
//                     <th className="p-4 text-sm font-medium text-gray-500">
//                       {t("common:actions")}
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {approvalRequests.length > 0 ? (
//                     approvalRequests.map((request) => (
//                       <tr
//                         key={request.id}
//                         className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50"
//                       >
//                         <td className="p-4 font-medium text-gray-800">
//                           {request.name}
//                         </td>
//                         <td className="p-4">
//                           <span
//                             className={`px-3 py-1 text-xs font-medium rounded-full ${
//                               request.role === "ASHA Worker"
//                                 ? "text-orange-700 bg-orange-100"
//                                 : "text-blue-700 bg-blue-100"
//                             }`}
//                           >
//                             {request.role}
//                           </span>
//                         </td>
//                         <td className="p-4 text-gray-600">{request.village}</td>
//                         <td className="p-4">
//                           <div className="flex space-x-2 text-sm font-medium text-purple-600">
//                             <button className="hover:underline">
//                               {/* --- CORRECTION: Use t function for button text --- */}
//                               {t("common:viewDetails")}
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="text-center p-4 text-gray-500">
//                         No approval requests pending.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         </>
//       )}
//     </main>
//   );
// };

// // Main App Component
// export default function App() {
//   return (
//     <div className="flex h-screen bg-gray-50 font-sans antialiased">
//       <Sidebar
//         activePageKey="enrollment" // Use the stable key, not the display name
//         navItems={translatedNavItems}
//         helpText={translatedHelpText}
//       />
//       <DashboardContent />
//     </div>
//   );
// }
import React, { useState, useEffect, useMemo } from "react";
import axios from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../sidebar";
import { useLanguage } from "../../../context/languageContext.jsx";
import LanguageToggle from "../../languageToggle.jsx";
import {
  LayoutDashboard,
  Droplets,
  Bell,
  FileText,
  Megaphone,
  MapPin,
  CircleHelp,
} from "lucide-react";


const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <p className="text-sm text-gray-500 mb-2">{title}</p>
    <p className="text-4xl font-bold text-gray-800">{value.toLocaleString()}</p>
  </div>
);

const FilterDropdown = ({ allTextKey, options, value, onChange, t }) => (
  <div className="relative">
    <select value={value} onChange={(e) => onChange(e.target.value)} className="appearance-none bg-white py-2 pl-3 pr-8 rounded-md border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
      <option value="">{t(allTextKey)}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
    </div>
  </div>
);

// --- 3. DASHBOARD PAGE COMPONENTS ---

const baseNavItems = [
  { key: "enrollment", icon: LayoutDashboard, path: "/admin/enroll" },
  { key: "waterReports", icon: Droplets, path: "/admin/water-reports" },
  { key: "alerts", icon: Bell, path: "/admin/alerts" },
  { key: "healthReports", icon: FileText, path: "/admin/health-reports" },
  { key: "awarenessPrograms", icon: Megaphone, path: "/admin/awareness" },
  { key: "hotspots", icon: MapPin, path: "/admin/hotspots" },
  { key: "manageLocations", icon: MapPin, path: "/admin/manage-locations" },
];

const DashboardContent = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [healthOfficials, setHealthOfficials] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allStates, setAllStates] = useState([]);
  const [allVillages, setAllVillages] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (selectedState) params.stateId = selectedState;
        if (selectedVillage) params.villageId = selectedVillage;

        if (allStates.length === 0) {
          const [statesRes, villagesRes] = await Promise.all([
            axios.get("/location/states"),
            axios.get("/location/villages"),
          ]);
          setAllStates(statesRes.data);
          setAllVillages(villagesRes.data);
        }

        const [dashboardRes, ashaRes, volunteerRes] = await Promise.all([
          axios.get("/enroll/dashboard", { params }),
          axios.get("/enroll/pending/asha-workers", { params }),
          axios.get("/enroll/pending/volunteers", { params }),
        ]);

        if (dashboardRes?.data) {
          setStats(dashboardRes.data.data.stats || {});
          setHealthOfficials(dashboardRes.data.data.healthOfficials || []);
        }

        const pendingAsha = (ashaRes?.data || []).map((item) => ({
          id: item.user.id, name: item.user.name, role: "ASHA Worker", village: item.village?.name || "N/A",
        }));
        const pendingVolunteers = (volunteerRes?.data || []).map((item) => ({
          id: item.user.id, name: item.user.name, role: "Volunteer", village: item.village?.name || "N/A",
        }));

        const combinedRequests = [...pendingAsha, ...pendingVolunteers];
        combinedRequests.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        setApprovalRequests(combinedRequests);

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedState, selectedVillage]);

  const filteredVillages = useMemo(() => {
    if (!selectedState) return allVillages;
    return allVillages.filter((village) => village.stateId === selectedState);
  }, [selectedState, allVillages]);
  
  if (loading && allStates.length === 0) {
      return <div className="flex-1 flex items-center justify-center"><div className="text-xl text-gray-500">{t("common:loading")}</div></div>;
  }

  if (error) {
      return <div className="flex-1 flex items-center justify-center"><div className="text-xl text-red-500 bg-red-100 p-4 rounded-lg">{error}</div></div>;
  }
  
  return (
    <main className="flex-1 p-8 bg-gray-50/ ৫০ overflow-y-auto">
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{t("dashboard:dashboardTitle")}</h2>
            <div className="flex items-center space-x-4 mt-4">
              <FilterDropdown t={t} allTextKey="common:allStates" options={allStates} value={selectedState} onChange={(value) => { setSelectedState(value); setSelectedVillage(""); }} />
              <FilterDropdown t={t} allTextKey="common:allVillages" options={filteredVillages} value={selectedVillage} onChange={setSelectedVillage} />
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>
       {loading ? ( <div className="text-center py-10 text-gray-500">Updating data...</div> ) : (
        <>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title={t("dashboard:ashaWorkers")} value={stats.ashaWorkers || 0} />
                <StatCard title={t("dashboard:registeredVillagers")} value={stats.registeredVillagers || 0}/>
                <StatCard title={t("dashboard:volunteersAvailable")} value={stats.volunteersAvailable || 0} />
                <StatCard title={t("dashboard:totalRegisteredUsers")} value={stats.totalRegisteredUsers || 0} />
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
 
            <div className="flex justify-between items-center mb-4">
 <h3 className="text-xl font-semibold text-gray-800">
                 {t("dashboard:healthOfficialsTitle")}
               </h3>
               <div className="flex space-x-3">
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => navigate("/admin/add-official")}
                >
                  {t("dashboard:addOfficialBtn")}
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    {/* --- CORRECTION: Use t function for table headers --- */}
                    <th className="p-4 text-sm font-medium text-gray-500">
                      {t("common:name")}
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      {t("dashboard:state")}
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      {t("dashboard:region")}
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      {t("common:status")}
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      {t("common:actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {healthOfficials.length > 0 ? (
                    healthOfficials.map((official) => (
                      <tr
                        key={official.id}
                        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50"
                      >
                        <td className="p-4 font-medium text-gray-800">
                          {official.name}
                        </td>
                        <td className="p-4 text-gray-600">
                          {official.region?.state?.name || "N/A"}
                        </td>
                        <td className="p-4 text-gray-600">
                          {official.region?.name || "N/A"}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              official.status === "ACTIVE"
                                ? "text-green-700 bg-green-100"
                                : "text-gray-700 bg-gray-200"
                            }`}
                          >
                            {official.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button className="text-purple-600 hover:underline font-medium text-sm">
                            {/* --- CORRECTION: Use t function for button text --- */}
                            {t("common:viewDetails")}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4 text-gray-500">
                        No health officials found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>



            </section>
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {t("dashboard:approvalRequestsTitle")}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    {/* --- CORRECTION: Use t function for table headers --- */}
                    <th className="p-4 text-sm font-medium text-gray-500">
                      {t("common:name")}
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      {t("dashboard:role")}
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      {t("dashboard:village")}
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      {t("common:actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {approvalRequests.length > 0 ? (
                    approvalRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50"
                      >
                        <td className="p-4 font-medium text-gray-800">
                          {request.name}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              request.role === "ASHA Worker"
                                ? "text-orange-700 bg-orange-100"
                                : "text-blue-700 bg-blue-100"
                            }`}
                          >
                            {request.role}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{request.village}</td>
                        <td className="p-4">
                          <div className="flex space-x-2 text-sm font-medium text-purple-600">
                            <button className="hover:underline">
                              {/* --- CORRECTION: Use t function for button text --- */}
                              {t("common:viewDetails")}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4 text-gray-500">
                        No approval requests pending.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
       )}
    </main>
  );
};

// --- 4. MAIN APP LAYOUT & EXPORT (WITH FIX) ---

// This new component sits inside the provider and can use the language hook.
const AppContent = () => {
    // --- FIX: The logic is moved here, to the component that needs it. ---
    const { t } = useLanguage();

    // Prepare the translated props for the Sidebar
    const translatedNavItems = baseNavItems.map((item) => ({
        ...item,
        name: t(`sidebar:${item.key}`),
    }));
    const translatedHelpText = t("sidebar:help");

    return (
        <div className="flex h-screen bg-gray-50 font-sans antialiased">
            {/* The Sidebar now receives the correctly translated props */}
            <Sidebar
                activePageKey="enrollment"
                // navItems={translatedNavItems}
                // helpText={translatedHelpText}
            />
            <DashboardContent />
        </div>
    );
};

export default function App() {
    
    return (
      
            <AppContent />
       
    );
}

              


