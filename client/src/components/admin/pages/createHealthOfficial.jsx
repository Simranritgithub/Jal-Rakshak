import React, { useState, useEffect } from "react"; // Import useEffect
import {
  FaBell,
  FaUserPlus,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import axios from "../../../utils/axiosInstance";

const AddHealthOfficial = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    title: "",
    department: "",
    regionId: "", // This will now be set by the select dropdown
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // --- NEW STATE ---
  // State to hold the list of regions fetched from the backend
  const [regions, setRegions] = useState([]);
  // State to handle loading and errors for the regions dropdown
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [regionsError, setRegionsError] = useState(null);

  // --- NEW LOGIC ---
  // Fetch regions from the API when the component mounts
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await axios.get("/enroll/region", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          setRegions(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch regions:", err);
        setRegionsError("Could not load regions. Please try refreshing.");
      } finally {
        setRegionsLoading(false);
      }
    };

    fetchRegions();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    const officialName = formData.name;

    try {
      const res = await axios.post("/enroll/add-health", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage({
        text: `Successfully added ${officialName}. An email has been sent with their login credentials.`,
        type: "success",
      });
      setFormData({
        name: "",
        contact: "",
        email: "",
        title: "",
        department: "",
        regionId: "",
      });
    } catch (err) {
      console.error(err);
      setMessage({
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main background for the entire page
    <div className="bg-slate-50 min-h-screen">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h4 className="text-xl font-bold text-sky-700">AquaSentials</h4>
            <div className="flex items-center gap-4">
              <FaBell
                className="text-slate-500 hover:text-slate-800 cursor-pointer"
                size={20}
              />
              <img
                src="http://bcsnygroup.com/wp-content/uploads/2020/09/woman-therapist.jpg"
                width="40"
                height="40"
                className="rounded-full border-2 border-slate-200"
                alt="profile"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="text-sm text-slate-500 mb-2" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <a href="#" className="hover:underline">
                  Dashboard
                </a>
                <svg
                  className="fill-current w-3 h-3 mx-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569 9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </li>
              <li className="flex items-center">
                <a href="#" className="hover:underline">
                  Enrollment
                </a>
                <svg
                  className="fill-current w-3 h-3 mx-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569 9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </li>
              <li>
                <span className="text-gray-400">Add Health Official</span>
              </li>
            </ol>
          </nav>
          <div className="flex items-center gap-4">
            <FaUserPlus className="text-3xl text-sky-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Add New Health Official
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Fill in the details below to register a new health official in
                the system.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* Section 1: Personal Information */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-base font-semibold leading-7 text-slate-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                This information will be used for identification and
                communication.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Jane Doe"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. jane.doe@health.gov"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Official Role */}
            <div className="mt-6">
              <h2 className="text-base font-semibold leading-7 text-slate-900">
                Official Role
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Define the official's role and their assigned operational
                region.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Chief Medical Officer"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Public Health Department"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    required
                  />
                </div>

                {/* --- UI CHANGE: Replaced text input with a dynamic select dropdown --- */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="regionId"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Assigned Region
                  </label>
                  {regionsError ? (
                    <p className="mt-1 text-sm text-red-600">{regionsError}</p>
                  ) : (
                    <select
                      id="regionId"
                      name="regionId"
                      value={formData.regionId}
                      onChange={handleChange}
                      disabled={regionsLoading}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm disabled:bg-slate-50"
                      required
                    >
                      <option value="" disabled>
                        {regionsLoading ? "Loading regions..." : "Select a region"}
                      </option>
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>

            {/* Message Area */}
            {message.text && (
              <div
                className={`mt-6 p-4 rounded-md flex items-center gap-3 ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {message.type === "success" ? (
                  <FaCheckCircle />
                ) : (
                  <FaExclamationCircle />
                )}
                <span className="text-sm font-medium">{message.text}</span>
              </div>
            )}

            {/* Form Actions/Buttons */}
            <div className="flex items-center justify-end gap-x-4 pt-8 mt-8 border-t border-slate-200">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: "",
                    contact: "",
                    email: "",
                    title: "",
                    department: "",
                    regionId: "",
                  })
                }
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-50"
              >
                {loading && (
                  <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                )}
                {loading ? "Saving..." : "Save Official"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddHealthOfficial;