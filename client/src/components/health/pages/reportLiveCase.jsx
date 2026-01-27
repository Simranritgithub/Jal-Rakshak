import React, { useState, useCallback } from "react";
import Sidebar from "./sidebar.jsx";

// --- Helper Components & Icons ---
// Using inline SVGs for icons to keep it all in one file.
const AlertCircle = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);
const UploadCloud = ({ className = "w-10 h-10" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
    <path d="M12 12v9"></path>
    <path d="m16 16-4-4-4 4"></path>
  </svg>
);
const FileIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
const Bell = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);
const SearchIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
// --- Main App Component ---
export default function App() {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    villageOrLocation: "",
    contact: "",
    suspectedDisease: "",
    symptoms: "",
    dateOfOnset: "",
    currentStatus: "",
    remarks: "",
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 8) {
      setErrors((prev) => ({
        ...prev,
        files: "You can upload a maximum of 8 files.",
      }));
      return;
    }
    setFiles((prev) => [...prev, ...selectedFiles]);
    setErrors((prev) => ({ ...prev, files: null }));
  };

  const removeFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const onDragOver = (e) => e.preventDefault();
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (files.length + droppedFiles.length > 8) {
        setErrors((prev) => ({
          ...prev,
          files: "You can upload a maximum of 8 files.",
        }));
        return;
      }
      setFiles((prev) => [...prev, ...droppedFiles]);
      setErrors((prev) => ({ ...prev, files: null }));
    },
    [files]
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientName.trim())
      newErrors.patientName = "Patient name is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    else if (isNaN(formData.age) || +formData.age <= 0 || +formData.age > 120)
      newErrors.age = "Please enter a valid age.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.villageOrLocation.trim())
      newErrors.villageOrLocation = "Village or location is required.";
    if (!formData.contact) newErrors.contact = "Contact number is required.";
    else if (!/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Please enter a valid 10-digit contact number.";
    if (!formData.suspectedDisease)
      newErrors.suspectedDisease = "Suspected disease is required.";
    if (!formData.symptoms.trim())
      newErrors.symptoms = "Symptoms are required.";
    if (!formData.dateOfOnset)
      newErrors.dateOfOnset = "Date of onset is required.";
    if (!formData.currentStatus)
      newErrors.currentStatus = "Current status is required.";
    return newErrors;
  };

  const resetForm = () => {
    setFormData({
      patientName: "",
      age: "",
      gender: "",
      villageOrLocation: "",
      contact: "",
      suspectedDisease: "",
      symptoms: "",
      dateOfOnset: "",
      currentStatus: "",
      remarks: "",
    });
    setFiles([]);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(false);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      resetForm();
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2500);
  };

  const getInputClass = (fieldName) => {
    return `w-full px-4 py-3 bg-slate-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-300 ${
      errors[fieldName]
        ? "border-red-400 focus:ring-red-400 focus:border-red-400"
        : "border-slate-200 focus:ring-blue-500 focus:border-blue-500"
    }`;
  };

  const recentReports = [
    {
      id: 1,
      case: "Case 001",
      disease: "Dengue",
      status: "Suspected",
      verification: "Admin",
      priority: "High",
    },
    {
      id: 2,
      case: "Case 002",
      disease: "Malaria",
      status: "Suspected",
      verification: "Admin",
      priority: "Medium",
    },
    {
      id: 3,
      case: "Case 003",
      disease: "Zika",
      status: "Verified",
      verification: "Dr. Anya",
      priority: "High",
    },
    {
      id: 4,
      case: "Case 004",
      disease: "Cholera",
      status: "Suspected",
      verification: "Admin",
      priority: "Low",
    },
    {
      id: 5,
      case: "Case 005",
      disease: "Dengue",
      status: "Recovered",
      verification: "Dr. Ben",
      priority: "Medium",
    },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans text-slate-800">
      <Sidebar activePage="Report Live Case" />

      <div className="flex-1 flex flex-col">
        <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="text-slate-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search cases, reports..."
                className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-5">
              <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                <Bell className="text-slate-600" size={22} />
              </button>
              <img
                src="https://img.freepik.com/free-photo/portrait-mature-therapist-sitting-table-looking-camera_1098-18156.jpg?t=st=1758662169~exp=1758665769~hmac=369786476ca1199b21075534f87d8f5119705dea188ec41c2bc55a25c62327cd&w=2000"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-slate-200 hover:ring-2 hover:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-1 text-slate-800">
                Report a Live Case
              </h2>
              <p className="text-slate-500 mb-6">
                Fill in the details below to report a new case.
              </p>

              {isSubmitted && (
                <div
                  className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-r-lg"
                  role="alert"
                >
                  <p className="font-bold">Success!</p>
                  <p>Your case report has been submitted successfully.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Patient Name"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    error={errors.patientName}
                    placeholder="Enter patient's full name"
                    getInputClass={getInputClass}
                  />
                  <InputField
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    error={errors.age}
                    placeholder="Enter age"
                    getInputClass={getInputClass}
                  />
                  <SelectField
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    error={errors.gender}
                    options={["Male", "Female", "Other"]}
                    placeholder="Select gender"
                    getInputClass={getInputClass}
                  />
                  <InputField
                    label="Village/Location"
                    name="villageOrLocation"
                    value={formData.villageOrLocation}
                    onChange={handleChange}
                    error={errors.villageOrLocation}
                    placeholder="Enter village or location"
                    getInputClass={getInputClass}
                  />
                  <InputField
                    label="Contact"
                    name="contact"
                    type="tel"
                    value={formData.contact}
                    onChange={handleChange}
                    error={errors.contact}
                    placeholder="Enter contact number"
                    getInputClass={getInputClass}
                  />
                  <SelectField
                    label="Suspected Disease"
                    name="suspectedDisease"
                    value={formData.suspectedDisease}
                    onChange={handleChange}
                    error={errors.suspectedDisease}
                    options={["Zika", "Dengue", "Malaria", "Cholera"]}
                    placeholder="Select suspected disease"
                    getInputClass={getInputClass}
                  />
                </div>
                <div className="mt-6">
                  <TextAreaField
                    label="Symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    error={errors.symptoms}
                    placeholder="Describe the symptoms..."
                    getInputClass={getInputClass}
                    rows="4"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <InputField
                    label="Date of Onset"
                    name="dateOfOnset"
                    type="date"
                    value={formData.dateOfOnset}
                    onChange={handleChange}
                    error={errors.dateOfOnset}
                    getInputClass={getInputClass}
                  />
                  <SelectField
                    label="Current Status"
                    name="currentStatus"
                    value={formData.currentStatus}
                    onChange={handleChange}
                    error={errors.currentStatus}
                    options={["Active", "Recovered", "Deceased"]}
                    placeholder="Select current status"
                    getInputClass={getInputClass}
                  />
                </div>
                <div className="mt-6">
                  <TextAreaField
                    label="Remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Any additional remarks..."
                    getInputClass={getInputClass}
                    rows="4"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Proof / Attachments
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                      errors.files
                        ? "border-red-400 bg-red-50"
                        : "border-slate-300 hover:border-blue-500 bg-slate-50"
                    }`}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                  >
                    <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500">
                      Drag & Drop or{" "}
                      <label
                        htmlFor="file-upload"
                        className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                      >
                        browse files
                      </label>{" "}
                      for reports, photos etc. (Max 8)
                    </p>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                    />
                  </div>
                  {errors.files && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.files}
                    </p>
                  )}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-semibold text-slate-600 text-sm">
                        Selected Files:
                      </h4>
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-slate-100 p-2 rounded-lg border border-slate-200"
                        >
                          <div className="flex items-center space-x-2 overflow-hidden">
                            <FileIcon className="text-slate-500 flex-shrink-0" />
                            <span className="text-sm text-slate-700 truncate">
                              {file.name}
                            </span>
                            <span className="text-xs text-slate-500 flex-shrink-0">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="p-1 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-100 transition-colors"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting && <Spinner />}{" "}
                      {isSubmitting ? "Submitting..." : "Submit Case"}
                    </button>
                    <button
                      type="button"
                      className="text-sm font-medium text-slate-600 hover:text-blue-600"
                    >
                      Save as Draft
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-sm font-medium text-slate-600 hover:text-red-600"
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-slate-700">
                  Recent Reports Preview
                </h3>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <ReportCard key={report.id} {...report} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const getPriorityClasses = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const ReportCard = ({
  case: caseId,
  disease,
  status,
  verification,
  priority,
}) => (
  <div className="bg-slate-50/70 p-4 rounded-lg border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-bold text-slate-800">
          {caseId}: {disease}
        </p>
        <p className="text-sm text-slate-500">
          Status: <span className="font-medium text-slate-600">{status}</span>
        </p>
      </div>
      <div
        className={`text-xs font-bold px-2 py-1 rounded-full ${getPriorityClasses(
          priority
        )}`}
      >
        {priority}
      </div>
    </div>
    <div className="mt-2 pt-2 border-t border-slate-200">
      <p className="text-xs text-slate-500">
        Verification by: <span className="font-medium">{verification}</span>
      </p>
    </div>
  </div>
);

// --- Reusable Field Components ---
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  getInputClass,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-slate-600 mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={getInputClass(name)}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && (
      <p
        id={`${name}-error`}
        className="mt-2 text-sm text-red-600 flex items-center"
      >
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  error,
  options,
  placeholder,
  getInputClass,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-slate-600 mb-2"
    >
      {label}
    </label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={`${getInputClass(name)} ${
        value ? "text-slate-800" : "text-slate-400"
      }`}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && (
      <p
        id={`${name}-error`}
        className="mt-2 text-sm text-red-600 flex items-center"
      >
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  getInputClass,
  rows = 3,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-slate-600 mb-2"
    >
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={getInputClass(name)}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    ></textarea>
    {error && (
      <p
        id={`${name}-error`}
        className="mt-2 text-sm text-red-600 flex items-center"
      >
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);
