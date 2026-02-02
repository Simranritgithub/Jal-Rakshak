import React, { useEffect, useState } from "react";
import {
  FaTasks,
  FaUserCircle,
  FaSpinner,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import instance from "../../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

/* ---------------- NOTIFICATION ---------------- */

const Notification = ({ message, type, onDismiss }) => {
  if (!message) return null;

  const styles = {
    success: {
      bg: "bg-green-100",
      border: "border-green-400",
      text: "text-green-800",
      icon: "✔",
    },
    error: {
      bg: "bg-red-100",
      border: "border-red-400",
      text: "text-red-800",
      icon: "⚠",
    },
  };

  const style = styles[type] || styles.error;

  return (
    <div
      className={`${style.bg} border-l-4 ${style.border} ${style.text} p-4 mb-6 rounded-md shadow-sm flex items-center justify-between`}
    >
      <div className="flex items-center gap-2">
        <span>{style.icon}</span>
        <p className="font-medium">{message}</p>
      </div>
      <button onClick={onDismiss}>&times;</button>
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

const AshaApproval = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const { id } = useParams();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await instance.get(`/enroll/view/asha-workers/${id}`);
        setWorkers(res.data.worker ? [res.data.worker] : []);
      } catch (err) {
        setNotification({
          message: "Failed to fetch pending requests",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, [id]);

  const handleStatusChange = async (employeeId, status) => {
    try {
      const res = await instance.patch(
        `/enroll/status/${employeeId}`,
        { status }
      );
      setWorkers(res.data.worker ? [res.data.worker] : []);
      setNotification({
        message: `Worker ${status} successfully`,
        type: "success",
      });
    } catch {
      setNotification({
        message: "Failed to update status",
        type: "error",
      });
    }
  };

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6AECE1] via-[#26CCC2] to-[#15173D]">
        <FaSpinner className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen  relative bg-gradient-to-br from-[#6AECE1] via-[#26CCC2] to-[#15173D] p-10">
    <Navbar/>

      <div className="max-w-7xl mx-auto relative top-12">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <FaTasks className="text-3xl text-[#15173D]" />
          <div>
            <h1 className="text-3xl font-extrabold text-[#15173D]">
              ASHA Worker Approval Requests
            </h1>
            <p className="text-white">
              Review and process pending applications
            </p>
          </div>
        </div>

        <Notification
          message={notification.message}
          type={notification.type}
          onDismiss={() => setNotification({ message: "", type: "" })}
        />

        {!workers.length ? (
          <div className="bg-white border border-[#6AECE1]/40 p-10 rounded-xl text-center">
            <FaInfoCircle className="text-4xl text-[#26CCC2] mx-auto mb-3" />
            <p className="text-[#2D3436] font-semibold">
              No Pending Requests
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {workers.map((worker) => (
              <div
                key={worker._id}
                className="bg-white border w-full border-[#6AECE1]/40 rounded-xl p-8 shadow-lg"
              >

                <div className="flex flex-col   ">

                  {/* Avatar */}
                  <FaUserCircle className="text-7xl text-[#6AECE1]" />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#26CCC2]">
                      {worker?.AshaworkerId?.name}
                    </h3>

                    <p className="mt-1 text-sm bg-[#26CCC2] text-white inline-block px-3 py-1 rounded-full">
                      ASHA Worker Candidate
                    </p>
                    <div className="flex flex-row gap-2 mt-2">
                      <span className="text-[#4a5052] font-semibold">Age:{worker?.age}</span>
                      <span className="text-[#444d4f] font-semibold">Gender:{worker?.gender}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

                      <Info label="Email" value={worker?.AshaworkerId?.email} />

                      <Info
                        label="Location"
                        value={[
                          worker.location?.village,
                          worker.location?.district,
                          worker.location?.state,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      />

                      <Info label="Address" value={worker.address} />

                      <Info label="Contact No" value={worker.phone} />

                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col gap-3 items-end">
                    {worker.status !=="Approved"&&( <button
                      onClick={() =>
                        handleStatusChange(worker._id, "Approved")
                      }
                      className="bg-[#26CCC2] text-white px-6 py-2 rounded-lg hover:opacity-90"
                    >
                      Approve
                    </button>
                   )}
                  { worker.status !=="Rejected"&&(
                    <button
                      onClick={() =>
                        handleStatusChange(worker._id, "Rejected")
                      }
                      className="bg-[#FFB76C] text-white px-6 py-2 rounded-lg hover:opacity-90"
                    >
                      Reject
                    </button>)}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

/* ---------------- SMALL INFO COMPONENT ---------------- */

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-[#4A8B88] font-medium">{label}</p>
    <p className="text-[#2D3436] font-semibold">
      {value || "N/A"}
    </p>
  </div>
);

export default AshaApproval;
