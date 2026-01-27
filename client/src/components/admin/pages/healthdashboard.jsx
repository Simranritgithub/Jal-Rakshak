import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ChevronRight,
  Calendar,
  Download,
  Users,
  Activity,
  PlusSquare,
  Wand2,
  UserPlus,
  Send,
} from "lucide-react";
import Sidebar from "../../sidebar"; // Importing your separate Sidebar component

// --- Mock Data for Charts ---
const weeklyCases = [
  { day: "Mon", cases: 10 },
  { day: "Tue", cases: 15 },
  { day: "Wed", cases: 7 },
  { day: "Thu", cases: 20 },
  { day: "Fri", cases: 18 },
  { day: "Sat", cases: 25 },
  { day: "Sun", cases: 12 },
];

const diseaseBreakdown = [
  { name: "Diarrhea", value: 40 },
  { name: "Cholera", value: 20 },
  { name: "Typhoid", value: 25 },
  { name: "Jaundice", value: 15 },
];
const COLORS = ["#3b82f6", "#16a34a", "#f97316", "#eab308"];

// --- Reusable Sub-components ---
const StatCard = ({ title, value, change }) => (
  <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-violet-100 rounded-lg"></div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs font-semibold text-red-600">{change}</p>
      </div>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 text-sm bg-white rounded-lg shadow-md border border-gray-200">
        <p className="font-bold text-gray-700">{label}</p>
        <p className="text-violet-600">{`Cases: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// --- Main Content Component ---
const HealthContent = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVillage, setSelectedVillage] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/enroll/dashboard",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDashboardData(res.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  if (!dashboardData)
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>No data found</p>
      </div>
    );

  const totalCases = diseaseBreakdown.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <main className="flex-1 p-6 bg-slate-50/50 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Health Dashboard
          </h1>
          <div className="flex items-center text-sm text-slate-500 mt-1">
            <span>Dashboard</span> <ChevronRight size={16} />{" "}
            <span className="text-slate-700 font-medium">Health Reports</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50">
            <Calendar size={16} /> <span>Today: 13 Sep, 2025</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-violet-600 rounded-md shadow-sm hover:bg-violet-700">
            <Download size={16} /> <span>Generate Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Villages Connected"
          value={dashboardData.stats.ashaWorkers}
          icon={Users}
          change="+2 this week"
        />
        <StatCard
          title="Active Hotspots"
          value={dashboardData.stats.registeredVillagers}
          icon={Activity}
          change="+1 hotspot"
        />
        <StatCard
          title="Trending Disease"
          value="Diarrhea"
          change="Village C"
        />
        <StatCard
          title="New Cases Today"
          value={dashboardData.stats.totalRegisteredUsers}
          icon={PlusSquare}
          change="+12%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              New Cases Overview
            </h2>
            <select
              className="border border-slate-300 p-2 text-sm rounded-md w-full sm:w-1/3 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
            >
              <option value="">All Villages</option>
              <option value="Village A">Village A</option>
              <option value="Village B">Village B</option>
              <option value="Village C">Village C</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center text-center border">
                <img
                  src="https://tse2.mm.bing.net/th/id/OIP.wkYoR8M9qHFenrgIxi1LNgHaE8?pid=Api&P=0&h=180"
                  alt="Diarrhea"
                  className="h-20 w-full object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-slate-800">Diarrhea</h3>
                <p className="text-2xl font-bold text-slate-900">20</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center text-center border">
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.zReI6RUi10VWmtDuMiwOmAHaFO?pid=Api&P=0&h=180"
                  alt="Cholera"
                  className="h-20 w-full object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-slate-800">Cholera</h3>
                <p className="text-2xl font-bold text-slate-900">10</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center text-center border">
                <img
                  src="https://static.foxnews.com/foxnews.com/content/uploads/2018/09/istock-601116450.jpg"
                  alt="Typhoid"
                  className="h-20 w-full object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-slate-800">Typhoid</h3>
                <p className="text-2xl font-bold text-slate-900">15</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4">
                Weekly Cases Trend
              </h2>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyCases}
                    margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="day"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(238, 242, 255, 0.6)" }}
                    />
                    <Bar dataKey="cases" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6 border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4">
                Disease Breakdown
              </h2>
              <div className="h-60 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={diseaseBreakdown}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      label={false}
                    >
                      {diseaseBreakdown.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" iconSize={8} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-800">
                      {totalCases}
                    </p>
                    <p className="text-xs text-slate-500">Total Cases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              AI Action Recommendations
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Wand2 className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                <p>
                  <strong className="text-slate-800">High Alert:</strong> Deploy
                  ASHA workers to Village B immediately due to a spike in
                  Cholera cases.
                </p>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Wand2 className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                <p>
                  <strong className="text-slate-800">Preventive Action:</strong>{" "}
                  Conduct water quality testing in Village C as a precautionary
                  measure.
                </p>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Wand2 className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                <p>
                  <strong className="text-slate-800">
                    Community Outreach:
                  </strong>{" "}
                  Distribute hygiene awareness pamphlets in all active hotspots.
                </p>
              </li>
            </ul>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-6 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              ASHA Worker Assignment
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Enter Worker Name"
                className="border border-slate-300 p-2 text-sm rounded-md w-full focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <select className="border border-slate-300 p-2 text-sm rounded-md w-full focus:ring-2 focus:ring-violet-500 focus:outline-none">
                <option>Select Village</option>
                <option>Village A</option>
                <option>Village B</option>
                <option>Village C</option>
              </select>
              <button className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white px-4 py-2 text-sm font-semibold rounded-md shadow-sm hover:bg-violet-700">
                <UserPlus size={16} /> Assign Worker
              </button>
            </form>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-6 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Alerts & Notifications
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Send voice or SMS alerts in local languages to different recipient
              groups.
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-md shadow-sm hover:bg-red-700">
              <Send size={16} /> Send Alert
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

// --- Main Page Component ---
const HealthDashboard = () => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar activePage="Health Reports" />
      <HealthContent />
    </div>
  );
};

export default HealthDashboard;
