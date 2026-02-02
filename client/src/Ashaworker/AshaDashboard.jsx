import React, { useEffect, useState } from "react";
import { Droplets, FileText, User, PlusCircle } from "lucide-react";
import axios from "axios";
import Glasscard from "../components/Glasscard";
import Navbar from "./Navbar";

const AshaDashboard = () => {

  const [stats, setStats] = useState({
    totalSamples: 0,
    safeSamples: 0,
    unsafeSamples: 0
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/water-sample/my-stats"
        );
        setStats(res.data.stats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#6AECE1]
        via-[#26CCC2]
        to-[#15173D]
        font-sans
        p-10
      "
    >
      <Navbar/>

      <div className="max-w-7xl mx-auto mt-16">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-[#15173D]">
            ASHA Worker Dashboard
          </h1>
          <p className="text-white text-lg">
            Welcome, <span className="font-bold">{user?.name}</span>
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          <StatCard
            title="Total Samples Collected"
            value={stats.totalSamples}
            icon={<FileText size={26} />}
          />

          <StatCard
            title="Safe Samples"
            value={stats.safeSamples}
            icon={<Droplets size={26} />}
          />

          <StatCard
            title="Unsafe Samples"
            value={stats.unsafeSamples}
            icon={<Droplets size={26} />}
          />

        </div>

        {/* ACTIONS */}
        <Glasscard className="p-10">

          <h2 className="text-2xl font-bold text-[#26CCC2] mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <ActionCard
              title="Create Water Report"
              description="Submit new water quality sample"
              icon={<PlusCircle size={26} />}
              link="/asha/water-report/create"
            />

            <ActionCard
              title="View My Reports"
              description="Check submitted water samples"
              icon={<FileText size={26} />}
              link="/asha/water-report/list"
            />

            <ActionCard
              title="My Profile"
              description="View or update profile"
              icon={<User size={26} />}
              link="/asha/profile"
            />

          </div>

        </Glasscard>

      </div>
    </div>
  );
};

/* ---------------- STAT CARD ---------------- */

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white border border-[#6AECE1]/40 p-6 rounded-xl shadow-sm flex items-center gap-4">

    <div className="bg-[#26CCC2]/10 p-3 rounded-lg text-[#26CCC2]">
      {icon}
    </div>

    <div>
      <p className="text-sm text-[#4A8B88] font-medium">
        {title}
      </p>
      <p className="text-3xl font-extrabold text-[#2D3436]">
        {value}
      </p>
    </div>

  </div>
);

/* ---------------- ACTION CARD ---------------- */

const ActionCard = ({ title, description, icon, link }) => (
  <a
    href={link}
    className="
      bg-white
      border border-[#6AECE1]/40
      p-6
      rounded-xl
      shadow-sm
      hover:shadow-md
      transition
      flex flex-col gap-3
    "
  >

    <div className="text-[#26CCC2]">
      {icon}
    </div>

    <h3 className="text-lg font-bold text-[#26CCC2]">
      {title}
    </h3>

    <p className="text-sm text-[#2D3436]">
      {description}
    </p>

  </a>
);

export default AshaDashboard;
