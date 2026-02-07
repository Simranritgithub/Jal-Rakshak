import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Glasscard from "../components/Glasscard";
import instance from "../utils/axiosInstance";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const res = await instance.get("/asha/alerts");
        if (res.data.success) {
          setAlerts(res.data.alerts);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
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
        p-16
      "
    >
      <Navbar />

      <div className="w-full max-w-7xl mx-auto relative top-4">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-[#15173D]">
            Alerts Dashboard
          </h1>

          <p className="mt-2 text-white text-lg">
            View and monitor alerts generated from unsafe and warning water
            reports.
          </p>
        </div>

        {/* TABLE CARD */}
        <Glasscard className="p-6">
          <h1 className="text-red-500 text-xl font-bold mb-2">ALERTS QUEUE</h1>

          {loading ? (
            <p className="text-center text-[#2D3436]">Loading alerts...</p>
          ) : alerts.length === 0 ? (
            <p className="text-center text-[#2D3436]">No alerts available</p>
          ) : (
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              {/* HEAD */}
              <thead className="bg-[#26CCC2] text-white">
                <tr>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Created At</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert._id} className="border-b border-[#6AECE1]/40">
                    {/* LOCATION */}
                    <td className="p-3 text-[#2D3436]">
                      {[
                        alert.location?.village,
                        alert.location?.district,
                        alert.location?.state,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </td>

                    {/* STATUS */}
                    <td className="p-3">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            alert.level === "Warning"
                              ? "bg-[#FFB76C] text-white"
                              : "bg-red-600 text-white"
                          }
                        `}
                      >
                        {alert.level}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="p-3 text-[#2D3436]">
                      {new Date(alert.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTION */}
                    <td className="p-3">
                      <button
                        className="
                          bg-[#26CCC2]
                          text-white
                          px-4 py-1
                          rounded-lg
                          hover:opacity-90
                        "
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Glasscard>
      </div>
    </div>
  );
};

export default Alerts;
