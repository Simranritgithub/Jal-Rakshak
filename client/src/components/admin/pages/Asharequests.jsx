import React, { useEffect, useState } from "react";
import instance from '../../../utils/axiosInstance';
import Glasscard from "../../../components/Glasscard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AshaWorkerRequests = () => {

  const [activeTab, setActiveTab] = useState("pending");
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate();

  /* ---------------- FETCH PENDING ---------------- */

  useEffect(() => {

  const fetchWorkers = async () => {
    try {
      setLoading(true);

      let url = "";

      if (activeTab === "pending") {
        url = "/enroll/pending/asha-workers";
      } 
      else if (activeTab === "approved") {
        url = "/enroll/approved/asha-workers";
      }

      const res = await instance.get(url);
      setWorkers(res.data.workers || []);

    } catch (error) {
      console.error("Error fetching ASHA workers:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchWorkers();

}, [activeTab]);


  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen 
        bg-gradient-to-br
        from-[#6AECE1]
        via-[#26CCC2]
        to-[#15173D]
        font-sans p-16
      ">
    <Navbar/>
    <main className="max-w-7xl mx-auto relative top-4"><h1 className="text-3xl font-extrabold text-[#15173D] mb-6">
        ASHA Worker Requests
      </h1>

      {/* TABS */}
      <div className="flex gap-4 mb-6">

        <TabButton
          active={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
          label="Pending Requests"
        />

        <TabButton
          active={activeTab === "approved"}
          onClick={() => setActiveTab("approved")}
          label="Approved Workers"
        />

      </div>

      <Glasscard className="p-6">

        {activeTab === "pending" && (
          <>
            {loading ? (
              <p className="text-[#2D3436]">Loading...</p>
            ) : workers.length === 0 ? (
              <p className="text-[#2D3436]">
                No pending requests
              </p>
            ) : (
              <table className="w-full border-collapse">

                <thead>
                  <tr className="border-b border-[#6AECE1]/40">
                    <th className="text-left p-3 text-[#4A8B88]">Name</th>
                    <th className="text-left p-3 text-[#4A8B88]">Email</th>
                    <th className="text-left p-3 text-[#4A8B88]">Location</th>
                    <th className="text-left p-3 text-[#4A8B88]">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {workers.map((worker) => (
                    <tr
                      key={worker._id}
                      className="border-b border-[#6AECE1]/20"
                    >

                      <td className="p-3 text-[#2D3436] font-medium">
                        {worker.AshaworkerId?.name}
                      </td>

                      <td className="p-3 text-[#2D3436]">
                        {worker.AshaworkerId?.email}
                      </td>

                      <td className="p-3 text-[#2D3436]">
  {[ 
    worker.location?.village,
    worker.location?.district,
    worker.location?.state
  ]
    .filter(Boolean)
    .join(", ")}
</td>


                      <td className="p-3">
                        <button
                        onClick={()=>navigate(`/admin/ashaworkers/${worker._id}`)}
                          className="
                            bg-[#26CCC2]
                            text-white
                            px-4 py-1
                            rounded-lg
                            hover:opacity-90
                          "
                        >
                          View Details
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </>
        )}

        {activeTab === "approved" && (
          <>
            {loading ? (
              <p className="text-[#2D3436]">Loading...</p>
            ) : workers.length === 0 ? (
              <p className="text-[#2D3436]">
                No Approved requests
              </p>
            ) : (
              <table className="w-full border-collapse">

                <thead>
                  <tr className="border-b border-[#6AECE1]/40">
                    <th className="text-left p-3 text-[#4A8B88]">Name</th>
                    <th className="text-left p-3 text-[#4A8B88]">Email</th>
                    <th className="text-left p-3 text-[#4A8B88]">Location</th>
                    <th className="text-left p-3 text-[#4A8B88]">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {workers.map((worker) => (
                    <tr
                      key={worker._id}
                      className="border-b border-[#6AECE1]/20"
                    >

                      <td className="p-3 text-[#2D3436] font-medium">
                        {worker.AshaworkerId?.name}
                      </td>

                      <td className="p-3 text-[#2D3436]">
                        {worker.AshaworkerId?.email}
                      </td>

                      <td className="p-3 text-[#2D3436]">
  {[ 
    worker.location?.village,
    worker.location?.district,
    worker.location?.state
  ]
    .filter(Boolean)
    .join(", ")}
</td>


                      <td className="p-3">
                        <button
                        onClick={()=>navigate(`/admin/ashaworkers/${worker._id}`)}
                          className="
                            bg-[#26CCC2]
                            text-white
                            px-4 py-1
                            rounded-lg
                            hover:opacity-90
                          "
                        >
                          View Details
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </>
        )}

      </Glasscard></main>

      

    </div>
  );
};

/* ---------------- TAB BUTTON ---------------- */

const TabButton = ({ label, active, onClick }) => (
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

export default AshaWorkerRequests;
