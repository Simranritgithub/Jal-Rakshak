import React, { useEffect, useState } from "react";
import {
  FaHandsHelping,
  FaUserCircle,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import axiosInstance from "../../../utils/axiosInstance"; // Using your custom axios instance

// Notification Banner Component (reusable)
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
      <button onClick={onDismiss} className="text-xl hover:opacity-75">&times;</button>
    </div>
  );
};

// Main Approval Component
const VolunteerApproval = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); // Tracks which volunteer is being updated
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Fetch pending volunteers from backend
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/enroll/pending/volunteers");
        // Assume API returns data in a nested `data` property
        setVolunteers(res.data.data || []);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
        setNotification({ message: "Failed to fetch pending requests.", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  // Approve or Reject handler
  const handleStatusChange = async (volunteerId, action) => {
    setUpdatingId(volunteerId); // Set loading state for the specific card
    setNotification({ message: "", type: "" }); // Clear previous notifications
    try {
      await axiosInstance.patch(
        `/admin/user/${volunteerId}/status`,
        { role: "VOLUNTEER", action }
      );
      setNotification({ message: `Volunteer ${action.toLowerCase()}ed successfully.`, type: "success" });
      // Remove volunteer from the list after the action
      setVolunteers(volunteers.filter((v) => v.id !== volunteerId));
    } catch (err) {
      console.error("Error updating status:", err);
      setNotification({ message: "An error occurred while updating status. Please try again.", type: "error" });
    } finally {
      setUpdatingId(null); // Reset the loading state
    }
  };

  // Helper function to render the main content
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-slate-500 py-16">
          <FaSpinner className="animate-spin text-4xl mb-4" />
          <p className="text-lg font-medium">Loading Pending Volunteers...</p>
        </div>
      );
    }

    if (!volunteers.length) {
      return (
        <div className="flex flex-col items-center justify-center text-center bg-slate-50/50 border-2 border-dashed rounded-lg py-16">
          <FaInfoCircle className="text-4xl text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">No Pending Requests</h3>
          <p className="text-slate-500 mt-1">There are currently no new volunteer requests for approval.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {volunteers.map((volunteer) => (
          <div
            key={volunteer.id}
            className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden"
          >
            <div className="p-6 flex flex-col md:flex-row items-start gap-6">
              {/* Avatar & Basic Info */}
              <div className="flex-shrink-0 flex flex-col items-center text-center w-full md:w-48">
                <FaUserCircle className="w-24 h-24 text-slate-300" />
                <h3 className="text-xl font-bold text-slate-800 mt-4">
                  {volunteer.name}
                </h3>
                <p className="text-sm font-semibold text-sky-600 bg-sky-100 inline-block px-3 py-1 rounded-full mt-2">
                  Volunteer Candidate
                </p>
                 <p className="text-sm text-slate-500 mt-2">{volunteer.region}</p>
              </div>

              {/* Detailed Info */}
              <div className="flex-1 w-full border-t md:border-t-0 md:border-l border-slate-200 md:pl-6 pt-6 md:pt-0">
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Contact Information</h4>
                        <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="sm:col-span-1"><dt className="font-medium text-slate-800">Email:</dt><dd className="text-slate-600">{volunteer.email}</dd></div>
                            <div className="sm:col-span-1"><dt className="font-medium text-slate-800">Contact:</dt><dd className="text-slate-600">{volunteer.contact}</dd></div>
                        </dl>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Skills & Availability</h4>
                        <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="sm:col-span-1"><dt className="font-medium text-slate-800">Availability:</dt><dd className="text-slate-600">{volunteer.availability}</dd></div>
                            <div className="sm:col-span-1"><dt className="font-medium text-slate-800">Experience:</dt><dd className="text-slate-600">{volunteer.experience}</dd></div>
                            <div className="sm:col-span-1"><dt className="font-medium text-slate-800">First Aid:</dt><dd className="text-slate-600">{volunteer.firstAid ? 'Yes' : 'No'}</dd></div>
                            <div className="sm:col-span-1"><dt className="font-medium text-slate-800">CPR Trained:</dt><dd className="text-slate-600">{volunteer.cpr ? 'Yes' : 'No'}</dd></div>
                        </dl>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-slate-200">
                    <button
                      onClick={() => handleStatusChange(volunteer.id, "APPROVE")}
                      disabled={updatingId === volunteer.id}
                      className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 disabled:bg-green-400 transition-colors"
                    >
                      {updatingId === volunteer.id ? <FaSpinner className="animate-spin mr-2" /> : <FaCheck className="mr-2" />}
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(volunteer.id, "REJECT")}
                      disabled={updatingId === volunteer.id}
                      className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:bg-red-400 transition-colors"
                    >
                      {updatingId === volunteer.id ? <FaSpinner className="animate-spin mr-2" /> : <FaTimes className="mr-2" />}
                      Reject
                    </button>
                </div>
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
            <FaHandsHelping className="text-3xl text-sky-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Volunteer Approval Requests
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Review and process pending applications for volunteers.
              </p>
            </div>
          </div>
        </div>

        <Notification 
          message={notification.message} 
          type={notification.type} 
          onDismiss={() => setNotification({ message: '', type: '' })} 
        />

        {renderContent()}
      </main>
    </div>
  );
};

export default VolunteerApproval;