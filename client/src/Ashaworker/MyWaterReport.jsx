import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Glasscard from "../components/Glasscard";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  setDebouncedSearch,
} from "../Redux/Slices/Searchslice.js";
import instance from "../utils/axiosInstance.js";
const Tabbutton = ({ label, onClick, active }) => {
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

const MyWaterReport = () => {
  const [activetab, setActivetab] = useState("all");
  const [reports, setReports] = useState([]);
  const dispatch = useDispatch();

  const { searchTerm, debouncedSearch } = useSelector((state) => state.search);
  useEffect(() => {
    const fetchmywaterreports = async () => {
      try {
        console.log("call");
        let url = "/asha/my/samples";
        let params = {};
        if (debouncedSearch) {
          params.value = debouncedSearch;
        }

        // tab type
        if (activetab !== "all") {
          params.type = activetab; // State | district | village
        }

        const res = await instance.get(url, { params });

        if (res.data.success) {
          setReports(res.data.waterreports);
        }
      } catch (error) {
        console.log(error?.response?.data.error || "error to fetch");
      }
    };
    fetchmywaterreports();
  }, [activetab, debouncedSearch]);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setDebouncedSearch(searchTerm));
    }, 1000);
    // console.log("calling");

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

        <div className="relative top-4 flex flex-col ">
          <input
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            placeholder="Enter location"
            className="px-4 py-2 text-slate-800 bg-white rounded-xl focus:border-2 focus:border-[#26CCC2]"
          />
          <div className="flex flex-row gap-2 mt-2">
            <Tabbutton
              active={activetab === "all"}
              onClick={() => setActivetab("all")}
              label="ALL"
            />
            <Tabbutton
              active={activetab === "State"}
              onClick={() => setActivetab("State")}
              label="Filter By State"
            />
            <Tabbutton
              active={activetab === "district"}
              onClick={() => setActivetab("district")}
              label="Filter By District"
            />
            <Tabbutton
              active={activetab === "village"}
              onClick={() => setActivetab("village")}
              label="Filter By Village"
            />
          </div>
          <Glasscard className="mt-4">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead className="bg-[#26CCC2] text-white">
                <tr>
                  <th className="p-3 text-left">State</th>
                  <th className="p-3 text-left">District</th>
                  <th className="p-3 text-left">Village</th>
                  <th className="p-3 text-left">pH</th>
                  <th className="p-3 text-left">TDS</th>
                  <th className="p-3 text-left">Turbidity</th>
                  <th className="p-3 text-left">Temp</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Collected By</th>
                </tr>
              </thead>

              <tbody>
                {reports.length > 0 ? (
                  reports.map((report, index) => (
                    <tr
                      key={report._id}
                      className="border-b hover:bg-slate-100"
                    >
                      <td className="p-3">{report.location?.State}</td>
                      <td className="p-3">{report.location?.district}</td>
                      <td className="p-3">{report.location?.village || "-"}</td>
                      <td className="p-3">{report.ph}</td>
                      <td className="p-3">{report.tds}</td>
                      <td className="p-3">{report.turbidity}</td>
                      <td className="p-3">{report.temperature}</td>
                      <td className="p-3 font-semibold flex items-center ">
                        <span
                          className={`
      px-3 py-1 rounded-full text-sm
      ${
        report.status === "Safe"
          ? "bg-green-500 text-white"
          : report.status === "Warning"
            ? "bg-yellow-400 text-black"
            : report.status === "Unsafe"
              ? "bg-red-500 text-white"
              : ""
      }
    `}
                        >
                          {report.status}
                        </span>
                      </td>

                      <td className="p-3">
                        {report.collectedBy?.AshaworkerId?.name} <br />
                        <span className="text-sm text-gray-500">
                          {report.collectedBy?.AshaworkerId?.email}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="p-4 text-center text-gray-500">
                      No reports found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Glasscard>
        </div>
      </div>
    </div>
  );
};
export default MyWaterReport;
