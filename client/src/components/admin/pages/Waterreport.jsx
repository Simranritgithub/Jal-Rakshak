import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  setDebouncedSearch,
  setReports,
} from "../../../Redux/Slices/Searchslice.js";
import Glasscard from "../../Glasscard.jsx";
import instance from "../../../utils/axiosInstance.js";
const TabContent = ({ active, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`
      px-6 py-2 rounded-lg font-semibold
      ${
        active
          ? "bg-[#26CCC2] text-white"
          : "bg-white text-[#26CCC2] border border-[#6AECE1]/40"
      }
    `}
    >
      {label}
    </button>
  );
};
const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-[#4A8B88]">{label}</p>
    <p className="text-sm font-semibold text-[#2D3436]">
      {value}
    </p>
  </div>
);


const Waterreport = () => {
  const [activetab, setActivetab] = useState("all");
  

  const [Reports, setReports] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { searchTerm, debouncedSearch} = useSelector(
    (state) => state.search,
  );
  useEffect(() => {
  const fetchWaterReports = async () => {
    try {
      setLoading(true);

      let url = "/water/reports";
      const params = {};

      // search value
      if (debouncedSearch) {
        params.value = debouncedSearch;
      }

      // tab type
      if (activetab !== "all") {
        params.type = activetab;   // State | district | village
      }

      const res = await instance.get(url, { params });

      if (res.data.success) {
        setReports(res.data.waterreports);
      }
    } catch (err) {
      console.log(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchWaterReports();
}, [debouncedSearch, activetab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setDebouncedSearch(searchTerm));
    }, 1000);
    console.log("calling");

    return () => clearTimeout(timer);
  }, [searchTerm]);
  

  return (
    <div
      className=" min-h-screen
        bg-gradient-to-br
        from-[#6AECE1]
        via-[#26CCC2]
        to-[#15173D]
        font-sans p-16
      "
    >
      <Navbar />
      <div className="w-full max-w-7xl mx-auto relative top-4">
        <h1 className="text-4xl font-extrabold text-[#15173D]">
          Review Water Report
        </h1>

        <p className="mt-2 text-white text-lg">
          Review water quality readings for villages and communities.
        </p>
        <div className="relative top-4 flex flex-col">
          <input
            className="bg-white text-slate-800 placeholder-slate-400
    border 
    border-slate-300 
    rounded-lg 
    px-4 
    py-2 
    w-72
    focus:outline-none 
    focus:border-[#26CCC2] 
    focus:ring-2 
    focus:ring-sky-200
    transition"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            placeholder="Search location..."
          />
          <div className="flex flex-row gap-2 mt-2">
            <TabContent
              active={activetab === "all"}
              onClick={() => setActivetab("all")}
              label="ALL"
            />
            <TabContent
              active={activetab === "State"}
              onClick={() => setActivetab("State")}
              label="Filter By State"
            />
            <TabContent
              active={activetab === "district"}
              onClick={() => setActivetab("district")}
              label="Filter By District"
            />
            <TabContent
              active={activetab === "village"}
              onClick={() => setActivetab("village")}
              label="Filter By Village"
            />
          </div>
        </div>
        {/* REPORT LIST */}
<div className="mt-8">
  {loading ? (
    <p className="text-white text-center">Loading reports...</p>
  ) : Reports.length === 0 ? (
    <div className="bg-white/80 border border-[#6AECE1]/40 p-10 rounded-xl text-center">
      <p className="text-[#2D3436] font-semibold">
        No water reports found
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {Reports.map((report) => (
        <Glasscard key={report._id} className="p-6">

          {/* LOCATION */}
          <h3 className="text-lg font-bold text-[#26CCC2]">
            {[report.location?.village ,
            report.location?.district,
            report.location?.State].filter(Boolean).join(",")}
          </h3>

          {/* STATUS */}
          <span
            className={`
              inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full
              ${
                report.status === "Safe"
                  ? "bg-green-100 text-green-700"
                  : report.status === "Warning"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {report.status}
          </span>

          {/* VALUES */}
          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

            <Info label="pH" value={report.ph} />
            <Info label="Turbidity" value={report.turbidity} />
            <Info label="TDS" value={report.tds} />
            <Info label="Temp (°C)" value={report.temperature} />

          </div>

          {/* REMARKS */}
          {report.remarks && (
            <p className="mt-3 text-sm text-[#2D3436]">
              <span className="font-semibold text-[#4A8B88]">Remarks:</span>{" "}
              {report.remarks}
            </p>
          )}

          {/* DATE */}
          <p className="mt-4 text-xs text-[#4A8B88]">
            {new Date(report.createdAt).toLocaleDateString()}
          </p>

        </Glasscard>
      ))}

    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default Waterreport;
