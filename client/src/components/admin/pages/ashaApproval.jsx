import React, { useEffect, useState } from "react";
import {
  FaTasks,
  FaUserCircle,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import instance from "../../../utils/axiosInstance";
import { useParams } from "react-router-dom"; // Using your custom axios instance

// Notification Banner Component
const Notification = ({ message, type, onDismiss }) => {
  if (!message) return null;

  const styles = {
    success: {
      bg: "bg-green-100",
      border: "border-green-400",
      text: "text-green-800",
      icon: <FaCheck />,
    },
    error: {
      bg: "bg-red-100",
      border: "border-red-400",
      text: "text-red-800",
      icon: <FaExclamationCircle />,
    },
  };

  const style = styles[type] || styles.error;

  return (
    <div
      className={`${style.bg} border-l-4 ${style.border} ${style.text} p-4 mb-6 rounded-md shadow-sm flex items-center justify-between`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="text-xl mr-3">{style.icon}</span>
        <p className="font-medium">{message}</p>
      </div>
      <button onClick={onDismiss} className="text-xl hover:opacity-75">
        &times;
      </button>
    </div>
  );
};

// Main Approval Component
const AshaApproval = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); // Tracks which worker is being updated
  const [notification, setNotification] = useState({ message: "", type: "" });
  const {id} =useParams();

  // Fetch pending ASHA workers from backend
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);
        const res = await instance.get(`/enroll/view/asha-workers/${id}`);
        // Assuming API returns data in a nested `data` property, which is a common pattern
        setWorkers(res.data.worker ? [res.data.worker] : []);

        console.log(res.data.worker)
      } catch (error) {
        console.error("Error fetching ASHA workers:", error);
        setNotification({
          message: "Failed to fetch pending requests.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  // Approve or Reject handler
  const handleStatusChange = async (employeeId, status) => {
  try {
    const res = await instance.patch(
      `/enroll/status/${employeeId}`,
      { status }  
    );

    setWorkers(res.data.worker ? [res.data.worker] : []);
  } catch (err) {
    console.error("Error updating status:", err);
  } finally {
    setUpdatingId(null);
  }
};


  // Main render function
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-slate-500 py-16">
          <FaSpinner className="animate-spin text-4xl mb-4" />
          <p className="text-lg font-medium">Loading Details...</p>
        </div>
      );
    }

    if (!workers.length) {
      return (
        <div className="flex flex-col items-center justify-center text-center bg-slate-50/50 border-2 border-dashed rounded-lg py-16">
          <FaInfoCircle className="text-4xl text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">
            No Pending Requests
          </h3>
          <p className="text-slate-500 mt-1">
            There are currently no new ASHA worker requests for approval.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {workers.map((worker) => (
          <div
            key={worker._id}
            className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="p-6 flex flex-col md:flex-col w-full max-w-7xl items-center gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <FaUserCircle className="w-24 h-24 text-slate-300" />
              </div>

              {/* Worker Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-800">
                  {worker?.AshaworkerId.name || "N/A"}
                </h3>
                <p className="text-sm font-semibold text-sky-600 bg-sky-100 inline-block px-3 py-1 rounded-full mt-2">
                  ASHA Worker Candidate
                </p>
                <div className="mt-4 border-t border-slate-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">

                  <p className="text-slate-500">
                    <strong className="text-slate-700 font-medium">
                      Email:
                    </strong>{" "}
                    {worker?.AshaworkerId.email || "N/A"}
                  </p>

                  <p className="text-slate-500">
                    <strong className="text-slate-700 font-medium">
                      Location:
                    </strong>{" "}
                    {[ 
    worker.location?.village,
    worker.location?.district,
    worker.location?.state
  ]
    .filter(Boolean)
    .join(", ")}
                  </p>
                  <p className="text-slate-500">
                    <strong className="text-slate-700 font-medium">
                      Address:
                    </strong>{" "}
                    {worker.address}
                  </p>
                  <p className="text-slate-500">
                    <strong className="text-slate-700 font-medium">
                      Contact no:
                    </strong>{" "}
                    {worker.phone}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-shrink-0 flex-row md:flex-row gap-3 justify-center pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200 md:pl-6 w-full md:w-auto">
                <button
                  onClick={() =>
                    handleStatusChange(worker._id, "Approved")
                  }
                  
                  className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 disabled:bg-green-400 transition-colors"
                >
                  
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(worker._id, "Rejected")
                  }
                  
                  className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:bg-red-400 transition-colors"
                >
                  
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <FaTasks className="text-3xl text-sky-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                ASHA Worker Approval Requests
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Review and process pending applications for ASHA workers.
              </p>
            </div>
          </div>
        </div>

        <Notification
          message={notification.message}
          type={notification.type}
          onDismiss={() => setNotification({ message: "", type: "" })}
        />

        {renderContent()}
      </main>
    </div>
  );
};

export default AshaApproval;
