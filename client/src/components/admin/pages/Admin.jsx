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
import { Calendar, Download } from "lucide-react";
import Navbar from "../components/Navbar";
import Glasscard from "../../Glasscard";
import Button from "../components/Button";

/* ------------------ MOCK DATA ------------------ */

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

const COLORS = ["#26CCC2", "#6AECE1", "#FFB76C", "#FFF57E"];

/* ------------------ STAT CARD ------------------ */

const StatCard = ({ title, value, change }) => (
  <div className="bg-white border border-[#6AECE1]/40 p-5 rounded-xl shadow-sm">
    <p className="text-sm font-medium text-[#4A8B88]">{title}</p>

    <div className="flex items-baseline gap-2 mt-1">
      <p className="text-3xl font-extrabold text-[#2D3436]">{value}</p>
      <p className="text-xs font-semibold text-[#FFB76C]">{change}</p>
    </div>
  </div>
);

/* ------------------ TOOLTIP ------------------ */

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 text-sm bg-white rounded-lg shadow border border-[#6AECE1]/40">
        <p className="font-bold text-[#26CCC2]">{label}</p>
        <p className="text-[#2D3436]">Cases: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

/* ------------------ CONTENT ------------------ */

const HealthContent = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVillage, setSelectedVillage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) setUser(stored);

    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/enroll/dashboard"
        );
        setDashboardData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!dashboardData) return <p className="text-white">No Data Found</p>;

  const totalCases = diseaseBreakdown.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <main className="flex-1 flex flex-col p-10 overflow-y-auto relative top-4">

      {/* HEADER (on gradient) */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-extrabold text-[#15173D]">
            Admin.Panel
          </h1>

          <p className="text-white font-bold text-2xl">
            Good Afternoon,{" "}
            <span className="font-bold">{user?.name}</span>
          </p>
        </div>

        <div className="flex gap-2">

          <button className="bg-white px-3 py-2 rounded-lg text-sm flex items-center gap-2">
            <Calendar size={16} />
            Today
          </button>

          <Button className="flex items-center gap-2">
            <Download size={16} />
            Generate Report
         </Button> 

        </div>
      </div>

      {/* CONTENT INSIDE GLASS */}
      <Glasscard className="p-10">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatCard title="Total Users" value={dashboardData.stats.totalUsers} change="+2" />
          <StatCard title="Total AshaWorkers" value={dashboardData.stats.ashaWorkers} change="+2" />
          <StatCard title="Total locations covered" value={dashboardData.stats.totallocations} change="+1" />
          <StatCard title="Active Hotspots" value={dashboardData.stats. activeHotspots} />
          <StatCard title="Unsafe Cases Today" value={dashboardData.stats.unsafeSamplestoday} change="+12%" />

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

           

            <div className="bg-white border border-[#6AECE1]/40 p-6 rounded-xl">

              <h2 className="text-lg font-bold text-[#26CCC2] mb-3">
                Weekly Cases Trend
              </h2>

              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyCases}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="cases" fill="#26CCC2" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            <div className="bg-white border border-[#6AECE1]/40 p-6 rounded-xl">

              <h2 className="text-lg font-bold text-[#26CCC2] mb-3">
                Disease Breakdown
              </h2>

              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={diseaseBreakdown}
                      dataKey="value"
                      innerRadius={50}
                      outerRadius={70}
                    >
                      {diseaseBreakdown.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <p className="text-center font-bold text-[#26CCC2]">
                Total Cases: {totalCases}
              </p>

            </div></div></div>

            {/* <div className="bg-white border border-[#6AECE1]/40 p-6 rounded-xl w-full mt-4 ">

              <h2 className="text-lg font-bold text-[#26CCC2] mb-3">
                ASHA Worker Assignment
              </h2>

              <input
                placeholder="Worker Name"
                className="w-full border border-[#6AECE1]/40 p-2 rounded-lg mb-2 text-[#2D3436]"
              />

              <select className="w-full border border-[#6AECE1]/40 p-2 rounded-lg mb-2 text-[#2D3436]">
                <option>Select Village</option>
                <option>Village A</option>
                <option>Village B</option>
              </select>
<div className="flex justify-end"><button className=" px-4 py-2  bg-[#26CCC2] text-white rounded-lg">
                Assign Worker
              </button></div>
              

            </div> */}

          

        

      </Glasscard>

    </main>
  );
};

/* ------------------ PAGE ------------------ */

const Admindashboard = () => {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#6AECE1]
        via-[#26CCC2]
        to-[#15173D]
        font-sans p-16
      "
    >
      <Navbar />
      <div className="w-full max-w-7xl mx-auto">
        <HealthContent />
      </div>
    </div>
  );
};

export default Admindashboard;
