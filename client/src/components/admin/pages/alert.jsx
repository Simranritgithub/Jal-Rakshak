// import React, { useState } from "react";
// import {
//   Bell,
//   Search,
//   ChevronDown,
//   Plus,
//   Settings,
//   CheckCircle,
//   Clock,
//   Reply,
//   PhoneForwarded,
//   Edit,
//   Trash2,
//   ThumbsUp,
//   AlertTriangle,
//   ChevronRight,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";
// import axiosInstance from "../../../utils/axiosInstance"; // Make sure this path is correct

// // A placeholder for the Sidebar component
// const Sidebar = ({ activePage }) => (
//   <aside className="w-64 bg-slate-800 text-slate-200 p-4 flex-shrink-0">
//     <h2 className="text-2xl font-bold mb-8 text-white">Dashboard</h2>
//     <nav>
//       <ul>
//         {["Dashboard", "Alerts", "Reports", "Settings"].map((page) => (
//           <li key={page}>
//             <a
//               href="#"
//               className={`block py-2 px-4 rounded-md ${
//                 activePage === page
//                   ? "bg-slate-700 text-white"
//                   : "hover:bg-slate-700"
//               }`}
//             >
//               {page}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   </aside>
// );

// // --- Mock Data ---
// const mockStats = [
//   { title: "Alerts Today", value: 125, icon: Bell },
//   { title: "Verified", value: 85, icon: CheckCircle },
//   { title: "Pending", value: 40, icon: Clock },
//   { title: "Manual Connections", value: 25, icon: PhoneForwarded },
// ];
// const mockAlerts = [
//   {
//     id: 1,
//     title: "High Turbidity & Fever Cluster",
//     sender: "Ms. Kavita",
//     village: "Village A, Block 1",
//     contact: "+91 9876543210",
//     role: "Asha Worker",
//     issue:
//       "Reported a case of high fever and debilitating diarrhea. Requesting immediate assistance. Water source also appears murky.",
//     timestamp: "3m ago",
//     status: "pending",
//   },
//   {
//     id: 2,
//     title: "Suspected Cholera Outbreak",
//     sender: "Dr. Ramesh Sharma",
//     village: "Village C, Block 2",
//     contact: "+91 9876543211",
//     role: "Medical Officer",
//     issue:
//       "Multiple cases of severe dehydration and diarrhea reported from the primary health center.",
//     timestamp: "45m ago",
//     status: "verified",
//   },
//   {
//     id: 3,
//     title: "Chemical Spill near River",
//     sender: "Mr. Singh",
//     village: "Village B, Block 1",
//     contact: "+91 9876543212",
//     role: "Village Head",
//     issue:
//       "A local factory seems to have discharged untreated waste into the river. The water has changed color and smells foul.",
//     timestamp: "2h ago",
//     status: "pending",
//   },
//   {
//     id: 4,
//     title: "Health Camp Follow-up",
//     sender: "Saanjh Foundation",
//     village: "Sector 3, Block 2",
//     contact: "+91 9876543213",
//     role: "NGO Coordinator",
//     issue:
//       "Follow-up report for the health camp. Malnutrition in children is a concern.",
//     timestamp: "1d ago",
//     status: "verified",
//   },
// ];
// const timelineData = [
//   { name: "Mon", alerts: 90 },
//   { name: "Tue", alerts: 110 },
//   { name: "Wed", alerts: 100 },
//   { name: "Thu", alerts: 140 },
//   { name: "Fri", alerts: 155 },
//   { name: "Sat", alerts: 130 },
//   { name: "Sun", alerts: 125 },
// ];
// const hourlyData = [
//   { name: "10a", count: 15 },
//   { name: "12p", count: 25 },
//   { name: "2p", count: 20 },
//   { name: "4p", count: 35 },
//   { name: "6p", count: 20 },
//   { name: "8p", count: 10 },
// ];

// // --- Sub-components ---
// const StatCard = ({ title, value, icon: Icon }) => (
//   <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
//     <div className="p-3 bg-violet-100 rounded-lg">
//       <Icon className="w-6 h-6 text-violet-600" />
//     </div>
//     <div>
//       <p className="text-sm text-slate-500">{title}</p>
//       <p className="text-2xl font-bold text-slate-800">{value}</p>
//     </div>
//   </div>
// );

// const AlertItem = ({ alert, onSelect, isSelected }) => (
//   <button
//     onClick={() => onSelect(alert)}
//     className={`w-full text-left p-3 rounded-lg border-l-4 transition-all duration-200 ${
//       isSelected
//         ? "bg-violet-50 border-violet-500"
//         : "bg-white border-transparent hover:bg-slate-50"
//     }`}
//   >
//     <div className="flex items-start gap-3">
//       <div
//         className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${
//           alert.status === "pending" ? "bg-orange-500" : "bg-green-500"
//         }`}
//       ></div>
//       <div className="flex-grow">
//         <div className="flex justify-between items-center">
//           <p className="font-semibold text-sm text-slate-800">{alert.title}</p>
//           <p className="text-xs text-slate-400">{alert.timestamp}</p>
//         </div>
//         <p className="text-xs text-slate-500 mt-1">
//           {alert.sender}, {alert.village}
//         </p>
//       </div>
//     </div>
//   </button>
// );

// const AlertDetails = ({ alert }) => {
//   if (!alert)
//     return (
//       <div className="bg-white p-6 rounded-lg border border-slate-200 flex items-center justify-center h-full min-h-[400px]">
//         <p className="text-slate-500">
//           Select an alert from the list to view details
//         </p>
//       </div>
//     );
//   return (
//     <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
//       <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
//         <div>
//           <h3 className="text-lg font-bold text-slate-800">{alert.title}</h3>
//           <p className="text-sm text-slate-500">
//             {alert.sender} ({alert.role})
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-md">
//             <Edit size={16} />
//           </button>
//           <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-md">
//             <Trash2 size={16} />
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 text-sm mb-4">
//         <div>
//           <p className="text-slate-500">Contact</p>
//           <p className="font-medium text-slate-700">{alert.contact}</p>
//         </div>
//         <div>
//           <p className="text-slate-500">Village/Region</p>
//           <p className="font-medium text-slate-700">{alert.village}</p>
//         </div>
//       </div>
//       <div>
//         <p className="text-sm text-slate-500">Reported Issue</p>
//         <p className="mt-1 p-3 text-sm text-slate-700 bg-slate-50 border rounded-md">
//           {alert.issue}
//         </p>
//       </div>
//       <div className="flex flex-col sm:flex-row gap-2 mt-6 border-t border-slate-200 pt-4">
//         <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700">
//           <ThumbsUp size={16} /> Verify Alert
//         </button>
//         <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg shadow-sm hover:bg-orange-600">
//           <AlertTriangle size={16} /> Escalate
//         </button>
//       </div>
//     </div>
//   );
// };

// const CommunicationPanel = ({ alert }) => {
//   if (!alert) return null;
//   return (
//     <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mt-6">
//       <h3 className="text-lg font-bold text-slate-800 mb-4">
//         Communication Panel
//       </h3>
//       <div className="space-y-4 h-64 overflow-y-auto pr-2 border-b pb-4">
//         <div className="flex items-start gap-2.5">
//           <img
//             src={`https://i.pravatar.cc/40?u=${alert.sender}`}
//             alt="Sender"
//             className="w-8 h-8 rounded-full"
//           />
//           <div className="bg-slate-100 p-3 rounded-lg max-w-xs">
//             <p className="text-sm text-slate-700">{alert.issue}</p>
//             <p className="text-xs text-slate-400 text-right mt-1">
//               {alert.sender}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-start gap-2.5 flex-row-reverse">
//           <img
//             src="https://i.pravatar.cc/40?u=admin"
//             alt="Agent"
//             className="w-8 h-8 rounded-full"
//           />
//           <div className="bg-violet-600 text-white p-3 rounded-lg max-w-xs">
//             <p className="text-sm">
//               Thank you. We are reviewing the case and will provide support
//               shortly.
//             </p>
//             <p className="text-xs text-violet-200 text-right mt-1">You</p>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="w-full p-3 pr-24 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
//           />
//           <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-violet-700">
//             Send
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2 mt-2">
//           <button className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full hover:bg-slate-200">
//             "Dispatching a team."
//           </button>
//           <button className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full hover:bg-slate-200">
//             "Please provide more details."
//           </button>
//           <button className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full hover:bg-slate-200">
//             "Escalating alert."
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AlertsTimeline = () => (
//   <div className="bg-white p-6 rounded-lg border border-slate-200 mt-6 lg:col-span-3 shadow-sm">
//     <h3 className="text-lg font-bold text-slate-800 mb-4">
//       Weekly Alert Trends
//     </h3>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <div className="md:col-span-2">
//         <ResponsiveContainer width="100%" height={250}>
//           <AreaChart
//             data={timelineData}
//             margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
//           >
//             <defs>
//               <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis
//               dataKey="name"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//             />
//             <YAxis fontSize={12} tickLine={false} axisLine={false} />
//             <Tooltip />
//             <Area
//               type="monotone"
//               dataKey="alerts"
//               stroke="#8b5cf6"
//               fill="url(#colorAlerts)"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//       <div>
//         <p className="text-sm text-slate-500">Peak Hour Alerts</p>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart
//             data={hourlyData}
//             margin={{ top: 20, right: 5, left: -20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis
//               dataKey="name"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//             />
//             <YAxis fontSize={12} tickLine={false} axisLine={false} />
//             <Tooltip cursor={{ fill: "rgba(238, 242, 255, 0.6)" }} />
//             <Bar dataKey="count" fill="#a78bfa" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   </div>
// );

// // --- New Modal Component (Corrected) ---
// const CreateAlertModal = ({ isOpen, onClose }) => {
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [AlertTarget, setAlertTarget] = useState("ALL");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     // The key here MUST be 'target' to match the backend
//     const alertData = {
//       title,
//       message,
//       target: AlertTarget,
//       regionId: "68c3cfe0f37f1d1f264cd3b3",
//       sentBy: "Admin",
//     };

//     try {
//       const response = await axiosInstance.post("/alerts", alertData);
//       console.log("Alert created successfully:", response.data);
//       setTitle("");
//       setMessage("");
//       setAlertTarget("ALL");
//       onClose();
//       console.log(response)
//     } catch (err) {
//       console.error(err);
//       const errorMessage =
//         err.response?.data?.error || "Failed to create alert. Please try again.";
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
//         <div className="flex justify-between items-center border-b pb-3 mb-4">
//           <h2 className="text-xl font-bold text-slate-800">Create New Alert</h2>
//           <button
//             onClick={onClose}
//             className="text-slate-500 hover:text-slate-800 text-3xl font-light"
//           >
//             &times;
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="title"
//                 className="block text-sm font-medium text-slate-700"
//               >
//                 Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="message"
//                 className="block text-sm font-medium text-slate-700"
//               >
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 rows="4"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
//               ></textarea>
//             </div>
//             <div>
//               <label
//                 htmlFor="target"
//                 className="block text-sm font-medium text-slate-700"
//               >
//                 Target Audience
//               </label>
//               <select
//                 id="target"
//                 value={AlertTarget}
//                 onChange={(e) => setAlertTarget(e.target.value)}
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
//               >
//                 <option value="ALL">All Users</option>
//                 <option value="ASHA_WORKER">ASHA_WORKER</option>
//                 <option value="HEALTH_OFFICIAL">HEALTH_OFFICIAL</option>
//                 <option value="VILLAGER">VILLAGER</option>
//               </select>
//             </div>
//           </div>
//           {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 disabled:bg-violet-300"
//             >
//               {isLoading ? "Sending..." : "Send Alert"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // --- Main Dashboard Component ---
// const AlertsDashboard = () => {
//   const [selectedAlert, setSelectedAlert] = useState(mockAlerts[0]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-slate-50 font-sans">
//       <Sidebar activePage="Alerts" />
//       <main className="flex-1 p-6 overflow-y-auto">
//         <CreateAlertModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         />
//         <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800">
//               Alerts Management
//             </h1>
//             <div className="flex items-center text-sm text-slate-500 mt-1">
//               <span>Dashboard</span> <ChevronRight size={16} />{" "}
//               <span className="text-slate-700 font-medium">Alerts</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-violet-600 rounded-lg shadow-sm hover:bg-violet-700"
//             >
//               <Plus size={16} /> Create Alert
//             </button>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//           <div className="lg:col-span-2 flex flex-col gap-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {mockStats.map((stat) => (
//                 <StatCard key={stat.title} {...stat} />
//               ))}
//             </div>
//             <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-grow flex flex-col">
//               <h3 className="font-semibold text-slate-800 mb-4 px-2">
//                 Alerts Queue
//               </h3>
//               <div className="space-y-1.5 pr-1 flex-grow overflow-y-auto">
//                 {mockAlerts.map((alert) => (
//                   <AlertItem
//                     key={alert.id}
//                     alert={alert}
//                     onSelect={setSelectedAlert}
//                     isSelected={selectedAlert?.id === alert.id}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="lg:col-span-3">
//             <AlertDetails alert={selectedAlert} />
//             <CommunicationPanel alert={selectedAlert} />
//           </div>
//           <div className="lg:col-span-5">
//             <AlertsTimeline />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AlertsDashboard;
import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Plus,
  Settings,
  CheckCircle,
  Clock,
  Reply,
  PhoneForwarded,
  Edit,
  Trash2,
  ThumbsUp,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import axiosInstance from "../../../utils/axiosInstance"; // Make sure this path is correct

// --- Helper Functions & Components ---

// A utility to format ISO date strings into a readable format like "3m ago"
const formatTimestamp = (isoDate) => {
  const date = new Date(isoDate);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const SuccessToast = ({ message, onClose }) => {
  if (!message) return null;
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-down">
      <CheckCircle size={20} />
      <span>{message}</span>
    </div>
  );
};

const Sidebar = ({ activePage }) => (
  <aside className="w-64 bg-slate-800 text-slate-200 p-4 flex-shrink-0">
    <h2 className="text-2xl font-bold mb-8 text-white">Dashboard</h2>
    <nav>
      <ul>
        {["Dashboard", "Alerts", "Reports", "Settings"].map((page) => (
          <li key={page}>
            <a
              href="#"
              className={`block py-2 px-4 rounded-md ${
                activePage === page
                  ? "bg-slate-700 text-white"
                  : "hover:bg-slate-700"
              }`}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

// --- Mock Data (for charts and stats only) ---
const mockStats = [
  { title: "Alerts Today", value: 125, icon: Bell },
  { title: "Verified", value: 85, icon: CheckCircle },
  { title: "Pending", value: 40, icon: Clock },
  { title: "Manual Connections", value: 25, icon: PhoneForwarded },
];
const timelineData = [
  { name: "Mon", alerts: 90 },
  { name: "Tue", alerts: 110 },
  { name: "Wed", alerts: 100 },
  { name: "Thu", alerts: 140 },
  { name: "Fri", alerts: 155 },
  { name: "Sat", alerts: 130 },
  { name: "Sun", alerts: 125 },
];
const hourlyData = [
  { name: "10a", count: 15 },
  { name: "12p", count: 25 },
  { name: "2p", count: 20 },
  { name: "4p", count: 35 },
  { name: "6p", count: 20 },
  { name: "8p", count: 10 },
];

// --- Sub-components ---
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-violet-100 rounded-lg">
      <Icon className="w-6 h-6 text-violet-600" />
    </div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const AlertItem = ({ alert, onSelect, isSelected }) => (
  <button
    onClick={() => onSelect(alert)}
    className={`w-full text-left p-3 rounded-lg border-l-4 transition-all duration-200 ${
      isSelected
        ? "bg-violet-50 border-violet-500"
        : "bg-white border-transparent hover:bg-slate-50"
    }`}
  >
    <div className="flex items-start gap-3">
      <div
        className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${
          alert.status === "pending" ? "bg-orange-500" : "bg-green-500"
        }`}
      ></div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-sm text-slate-800">{alert.title}</p>
          <p className="text-xs text-slate-400">
            {formatTimestamp(alert.createdAt)}
          </p>
        </div>
        <p className="text-xs text-slate-500 mt-1">{alert.sentBy}</p>
      </div>
    </div>
  </button>
);

const AlertDetails = ({ alert }) => {
  if (!alert)
    return (
      <div className="bg-white p-6 rounded-lg border border-slate-200 flex items-center justify-center h-full min-h-[400px]">
        <p className="text-slate-500">
          Select an alert from the list to view details
        </p>
      </div>
    );
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{alert.title}</h3>
          <p className="text-sm text-slate-500">{alert.sentBy}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-md">
            <Edit size={16} />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-md">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-slate-500">Target</p>
          <p className="font-medium text-slate-700">{alert.target}</p>
        </div>
        <div>
          <p className="text-slate-500">Region</p>
          <p className="font-medium text-slate-700">{alert.regionId}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500">Message</p>
        <p className="mt-1 p-3 text-sm text-slate-700 bg-slate-50 border rounded-md">
          {alert.message}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-6 border-t border-slate-200 pt-4">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700">
          <ThumbsUp size={16} /> Verify Alert
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg shadow-sm hover:bg-orange-600">
          <AlertTriangle size={16} /> Escalate
        </button>
      </div>
    </div>
  );
};

const CommunicationPanel = ({ alert }) => {
  if (!alert) return null;
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mt-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Communication Panel
      </h3>
      <div className="space-y-4 h-64 overflow-y-auto pr-2 border-b pb-4">
        <div className="flex items-start gap-2.5">
          <img
            src={`https://i.pravatar.cc/40?u=${alert.sentBy}`}
            alt="Sender"
            className="w-8 h-8 rounded-full"
          />
          <div className="bg-slate-100 p-3 rounded-lg max-w-xs">
            <p className="text-sm text-slate-700">{alert.message}</p>
            <p className="text-xs text-slate-400 text-right mt-1">
              {alert.sentBy}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 flex-row-reverse">
          <img
            src="https://i.pravatar.cc/40?u=admin"
            alt="Agent"
            className="w-8 h-8 rounded-full"
          />
          <div className="bg-violet-600 text-white p-3 rounded-lg max-w-xs">
            <p className="text-sm">
              Thank you. We are reviewing the case and will provide support
              shortly.
            </p>
            <p className="text-xs text-violet-200 text-right mt-1">You</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-3 pr-24 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-violet-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const AlertsTimeline = () => (
  <div className="bg-white p-6 rounded-lg border border-slate-200 mt-6 lg:col-span-3 shadow-sm">
    <h3 className="text-lg font-bold text-slate-800 mb-4">
      Weekly Alert Trends
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={timelineData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="alerts"
              stroke="#8b5cf6"
              fill="url(#colorAlerts)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="text-sm text-slate-500">Peak Hour Alerts</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={hourlyData}
            margin={{ top: 20, right: 5, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: "rgba(238, 242, 255, 0.6)" }} />
            <Bar dataKey="count" fill="#a78bfa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const CreateAlertModal = ({ isOpen, onClose, onAlertCreated }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [AlertTarget, setAlertTarget] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const alertData = {
      title,
      message,
      target: AlertTarget,
      regionId: "68c3cfe0f37f1d1f264cd3b3",
      sentBy: "Admin",
    };
    try {
      const response = await axiosInstance.post("/alerts", alertData);
      onAlertCreated(response.data.alert);
      setTitle("");
      setMessage("");
      setAlertTarget("ALL");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create alert.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-slate-800">Create New Alert</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 text-3xl font-light"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="target"
                className="block text-sm font-medium text-slate-700"
              >
                Target Audience
              </label>
              <select
                id="target"
                value={AlertTarget}
                onChange={(e) => setAlertTarget(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
              >
                <option value="ALL">All Users</option>
                <option value="ASHA_WORKER">ASHA_WORKER</option>
                <option value="HEALTH_OFFICIAL">HEALTH_OFFICIAL</option>
                <option value="VILLAGER">VILLAGER</option>
              </select>
            </div>
          </div>
          {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 disabled:bg-violet-300"
            >
              {isLoading ? "Sending..." : "Send Alert"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---
const AlertsDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/alerts"); // Ensure you have this endpoint
        setAlerts(response.data);
        if (response.data.length > 0) setSelectedAlert(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const handleAlertCreated = (newAlert) => {
    setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
    setSuccessMessage("Alert created successfully!");
    setIsModalOpen(false);
    // Automatically select the new alert
    setSelectedAlert(newAlert);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar activePage="Alerts" />
      <main className="flex-1 p-6 overflow-y-auto">
        <SuccessToast
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
        <CreateAlertModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAlertCreated={handleAlertCreated}
        />

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Alerts Management
            </h1>
            <div className="flex items-center text-sm text-slate-500 mt-1">
              <span>Dashboard</span> <ChevronRight size={16} />{" "}
              <span className="text-slate-700 font-medium">Alerts</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-violet-600 rounded-lg shadow-sm hover:bg-violet-700"
            >
              <Plus size={16} /> Create Alert
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockStats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-grow flex flex-col">
              <h3 className="font-semibold text-slate-800 mb-4 px-2">
                Alerts Queue
              </h3>
              <div className="space-y-1.5 pr-1 flex-grow overflow-y-auto">
                {isLoading ? (
                  <p className="text-slate-500 text-center p-4">
                    Loading alerts...
                  </p>
                ) : alerts.length > 0 ? (
                  alerts.map((alert) => (
                    <AlertItem
                      key={alert.id}
                      alert={alert}
                      onSelect={setSelectedAlert}
                      isSelected={selectedAlert?.id === alert.id}
                    />
                  ))
                ) : (
                  <p className="text-slate-500 text-center p-4">
                    No alerts found.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <AlertDetails alert={selectedAlert} />
            <CommunicationPanel alert={selectedAlert} />
          </div>
          <div className="lg:col-span-5">
            <AlertsTimeline />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlertsDashboard;
