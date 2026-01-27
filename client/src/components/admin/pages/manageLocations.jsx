import React, { useState, useEffect, useMemo } from "react";
import axios from "../../../utils/axiosInstance";
import {
  PlusCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  MapPin,
  Building,
  Home,
  Search,
  Loader2,
  Info,
} from "lucide-react";
import Sidebar from "../../sidebar";
// --- Data for Indian States & Languages ---
const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
].sort();

const stateLanguages = {
  "Andhra Pradesh": ["Telugu"], "Arunachal Pradesh": ["English"], "Assam": ["Assamese", "Bengali", "Bodo"],
  "Bihar": ["Hindi"], "Chhattisgarh": ["Chhattisgarhi", "Hindi"], "Goa": ["Konkani", "Marathi"], "Gujarat": ["Gujarati"],
  "Haryana": ["Hindi"], "Himachal Pradesh": ["Hindi"], "Jharkhand": ["Hindi"], "Karnataka": ["Kannada"],
  "Kerala": ["Malayalam"], "Madhya Pradesh": ["Hindi"], "Maharashtra": ["Marathi"], "Manipur": ["Meiteilon (Manipuri)"],
  "Meghalaya": ["English"], "Mizoram": ["Mizo", "English"], "Nagaland": ["English"], "Odisha": ["Odia"],
  "Punjab": ["Punjabi"], "Rajasthan": ["Hindi"], "Sikkim": ["English", "Nepali", "Sikkimese", "Lepcha"],
  "Tamil Nadu": ["Tamil"], "Telangana": ["Telugu", "Urdu"], "Tripura": ["Bengali", "Kokborok", "English"],
  "Uttar Pradesh": ["Hindi"], "Uttarakhand": ["Hindi", "Sanskrit"], "West Bengal": ["Bengali", "Nepali"],
  "Andaman and Nicobar Islands": ["Hindi", "English"], "Chandigarh": ["English"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Gujarati", "Hindi", "Marathi", "English"],
  "Delhi": ["Hindi", "English"], "Jammu and Kashmir": ["Kashmiri", "Dogri", "Urdu", "Hindi", "English"],
  "Ladakh": ["Ladakhi", "Tibetan", "Hindi", "English"], "Lakshadweep": ["Malayalam"], "Puducherry": ["Tamil", "Telugu", "Malayalam", "French", "English"],
};


// --- UI Sub-components (Polished & Improved) ---

const CustomTable = ({ headers, data, onDelete, renderRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
              <th scope="col" className="relative px-6 py-3 text-right">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) =>
                renderRow(
                  item,
                  index + (currentPage - 1) * itemsPerPage,
                  onDelete
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="text-center py-12 text-slate-500"
                >
                  <p className="font-medium">No Data Available</p>
                  <p className="text-sm">
                    Please add a new entry to get started.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-4 py-3 flex items-center justify-between border-t bg-slate-50">
          <div className="text-sm text-slate-700">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const AddModal = ({
  isOpen,
  onClose,
  onSave,
  type,
  parentData,
  isSaving,
  allStates,
  allRegions,
  allVillages,
}) => {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [language, setLanguage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [showCustomLanguage, setShowCustomLanguage] = useState(false);

  // --- Duplicate Entry Check ---
  const duplicateCheck = useMemo(() => {
    if (!name) return { isDuplicate: false, message: "" };
    if (type === 'states') {
      const isDuplicate = allStates.some(s => s.name.toLowerCase() === name.toLowerCase());
      return { isDuplicate, message: isDuplicate ? "This state already exists." : "" };
    }
    if (type === 'regions' && parentId) {
      const isDuplicate = allRegions.some(r => r.name.toLowerCase() === name.toLowerCase() && r.stateId === parentId);
      return { isDuplicate, message: isDuplicate ? "This region already exists in the selected state." : "" };
    }
    if (type === 'villages' && parentId) {
      const isDuplicate = allVillages.some(v => v.name.toLowerCase() === name.toLowerCase() && v.regionId === parentId);
      return { isDuplicate, message: isDuplicate ? "This village already exists in the selected region." : "" };
    }
    return { isDuplicate: false, message: "" };
  }, [name, parentId, type, allStates, allRegions, allVillages]);

  // --- State-Specific Language Logic ---
  const availableLanguages = useMemo(() => {
    if (type !== 'regions' || !parentId) return [];
    const selectedState = allStates.find(s => s.id === parentId);
    return stateLanguages[selectedState?.name] || [];
  }, [parentId, type, allStates]);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setParentId("");
      setLanguage("");
      setLatitude("");
      setLongitude("");
      setShowCustomLanguage(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (type === 'regions' && parentId) {
      const languages = availableLanguages;
      const defaultLanguage = languages.length > 0 ? languages[0] : "";
      setLanguage(defaultLanguage);
      setShowCustomLanguage(languages.length === 0);
    }
  }, [parentId, type, availableLanguages]);
  
  const handleLanguageChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomLanguage(true);
      setLanguage("");
    } else {
      setShowCustomLanguage(false);
      setLanguage(value);
    }
  };

  const handleGeocode = async () => {
    if (!name.trim() || !parentId) {
      alert("Please provide a village name and select a region first.");
      return;
    }
    setIsGeocoding(true);
    try {
      const selectedRegion = allRegions.find((r) => r.id === parentId);
      const selectedState = allStates.find(
        (s) => s.id === selectedRegion?.stateId
      );

      if (!selectedRegion || !selectedState) {
        throw new Error("Could not find state or region information.");
      }

      const query = `${name}, ${selectedRegion.name}, ${selectedState.name}, India`;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&limit=1`,
        {
          withCredentials: false, 
        }
      );

      if (response.data && response.data.length > 0) {
        setLatitude(response.data[0].lat);
        setLongitude(response.data[0].lon);
      } else {
        alert(
          "Could not find coordinates for this village. Please enter them manually if known."
        );
        setLatitude("");
        setLongitude("");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("An error occurred while fetching coordinates.");
    } finally {
      setIsGeocoding(false);
    }
  };

  if (!isOpen) return null;

  const config = {
    states: {
      title: "Add New State",
      icon: <MapPin className="h-6 w-6 text-indigo-600" />,
    },
    regions: {
      title: "Add New Region",
      icon: <Building className="h-6 w-6 text-indigo-600" />,
    },
    villages: {
      title: "Add New Village",
      icon: <Home className="h-6 w-6 text-indigo-600" />,
    },
  }[type];

  const parentType = type === "regions" ? "State" : "Region";

  const handleSaveClick = () => {
    if (!name.trim() || isSaving || duplicateCheck.isDuplicate) return;
    if (type !== "states" && !parentId) {
      alert(`Please select a ${parentType}.`);
      return;
    }
    onSave({ name, parentId, language, latitude, longitude });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center p-4 transition-all duration-300 ${
        isOpen ? "bg-black bg-opacity-60" : "bg-opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100">
            {config.icon}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800">{config.title}</h2>
            <p className="text-sm text-slate-500 mt-1">
              Fill in the details below to add a new entry.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {type !== "states" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {parentType}
              </label>
              <select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              >
                <option value="">Select a {parentType.toLowerCase()}...</option>
                {parentData.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {type === "states" ? (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                State Name
              </label>
              <select
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              >
                <option value="">Select a State or UT...</option>
                {indianStates.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {type.slice(0, -1)} Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={`e.g., New ${type.slice(0, -1)}`}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              />
            </div>
          )}

          {duplicateCheck.isDuplicate && (
            <div className="flex items-center gap-2 text-sm text-red-600 -mt-4">
              <Info className="h-4 w-4 flex-shrink-0" />
              {duplicateCheck.message}
            </div>
          )}

          {type === "regions" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Official Language
              </label>
              <select
                value={showCustomLanguage ? 'custom' : language}
                onChange={handleLanguageChange}
                disabled={!parentId}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow disabled:bg-slate-50"
              >
                <option value="" disabled={availableLanguages.length > 0}>
                  {parentId ? (availableLanguages.length > 0 ? "Select a language" : "No official languages found") : "Select a state first"}
                </option>
                {availableLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                <option value="custom">Other...</option>
              </select>

              {showCustomLanguage && (
                  <input
                    type="text"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    placeholder="Enter language (e.g., English)"
                    className="mt-2 w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  />
              )}
            </div>
          )}

          {type === "villages" && (
            <>
              <div className="flex items-end gap-2">
                <button
                  onClick={handleGeocode}
                  disabled={isGeocoding || !name || !parentId}
                  className="flex items-center justify-center px-4 py-2.5 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 disabled:opacity-50 transition-colors"
                >
                  {isGeocoding ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  <span className="ml-2">Find Coordinates</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Auto-filled"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Auto-filled"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-5 py-2.5 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            disabled={isSaving || !name || (type !== 'states' && !parentId) || duplicateCheck.isDuplicate}
            className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:bg-indigo-400 transition-colors shadow-sm"
          >
            {isSaving ? "Saving..." : "Add Entry"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = ({ isOpen, onClose, onConfirm, item, isDeleting }) => {
  if (!isOpen || !item) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center p-4 transition-all duration-300 ${
        isOpen ? "bg-black bg-opacity-60" : "bg-opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800">
              Confirm Deletion
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Are you sure you want to delete{" "}
              <span className="font-bold text-slate-700">"{item.name}"</span>?
              This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-5 py-2.5 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:bg-red-400 transition-colors shadow-sm"
          >
            {isDeleting ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-10">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);
const ErrorDisplay = ({ message }) => (
  <div
    className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md my-4"
    role="alert"
  >
    <div className="flex">
      <div className="py-1">
        <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
      </div>
      <div>
        <p className="font-bold">An Error Occurred</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  </div>
);

// --- Main Component ---

export default function ManageLocations() {
  const [activeTab, setActiveTab] = useState("states");
  const [states, setStates] = useState([]);
  const [regions, setRegions] = useState([]);
  const [villages, setVillages] = useState([]);

  const [loading, setLoading] = useState({ page: true, action: false });
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ type: null, isOpen: false, item: null });

  useEffect(() => {
    const fetchData = async () => {
      setLoading({ ...loading, page: true });
      setError(null);
      try {
        const [statesRes, regionsRes, villagesRes] = await Promise.all([
          axios.get("/location/states"),
          axios.get("/location/regions"),
          axios.get("/location/villages"),
        ]);
        setStates(statesRes.data);
        setRegions(regionsRes.data);
        setVillages(villagesRes.data);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Could not connect to the server.";
        setError(errorMessage);
      } finally {
        setLoading((prev) => ({ ...prev, page: false }));
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (type, item = null) => {
    setError(null);
    setModal({ type, isOpen: true, item });
  };
  const handleCloseModal = () => {
    setModal({ type: null, isOpen: false, item: null });
  };

  const handleSave = async ({
    name,
    parentId,
    language,
    latitude,
    longitude,
  }) => {
    setLoading({ ...loading, action: true });
    setError(null);
    try {
      if (activeTab === "states") {
        const response = await axios.post("/location/states", { name });
        setStates((prev) =>
          [...prev, response.data].sort((a, b) => a.name.localeCompare(b.name))
        );
      } else if (activeTab === "regions") {
        const response = await axios.post("/location/regions", {
          name,
          stateId: parentId,
          language,
        });
        setRegions((prev) =>
          [...prev, response.data].sort((a, b) => a.name.localeCompare(b.name))
        );
      } else if (activeTab === "villages") {
        const response = await axios.post("/location/villages", {
          name,
          regionId: parentId,
          latitude,
          longitude,
        });
        setVillages((prev) =>
          [...prev, response.data].sort((a, b) => a.name.localeCompare(b.name))
        );
      }
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to create entry.`);
    } finally {
      setLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleDelete = async () => {
    const { item } = modal;
    if (!item) return;
    setLoading({ ...loading, action: true });
    setError(null);
    try {
      if (activeTab === "states") {
        await axios.delete(`/location/states/${item.id}`);
        setStates((prev) => prev.filter((s) => s.id !== item.id));
      } else if (activeTab === "regions") {
        await axios.delete(`/location/regions/${item.id}`);
        setRegions((prev) => prev.filter((r) => r.id !== item.id));
      } else if (activeTab === "villages") {
        await axios.delete(`/location/villages/${item.id}`);
        setVillages((prev) => prev.filter((v) => v.id !== item.id));
      }
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to delete ${item.name}.`);
    } finally {
      setLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const regionsWithState = useMemo(
    () =>
      regions.map((r) => ({
        ...r,
        stateName: states.find((s) => s.id === r.stateId)?.name || "N/A",
      })),
    [regions, states]
  );

  const villagesWithRegionAndState = useMemo(
    () =>
      villages.map((v) => {
        const region = regions.find((r) => r.id === v.regionId);
        const state = states.find((s) => s.id === region?.stateId);
        return {
          ...v,
          regionName: region?.name || "N/A",
          stateName: state?.name || "N/A",
        };
      }),
    [villages, regions, states]
  );

  const renderContent = () => {
    if (loading.page) return <LoadingSpinner />;

    const configs = {
      states: {
        title: "States Management",
        headers: ["S.No.", "Name"],
        data: states,
        renderRow: (item, index, onDelete) => (
          <tr key={item.id} className="hover:bg-slate-50">
            <td className="px-6 py-4 w-16 text-sm font-medium text-slate-900">
              {index + 1}
            </td>
            <td className="px-6 py-4 text-sm text-slate-600">{item.name}</td>
            <td className="px-6 py-4 text-right">
              <button
                onClick={() => onDelete(item)}
                className="text-red-600 hover:text-red-800 flex items-center gap-1.5"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </td>
          </tr>
        ),
      },
      regions: {
        title: "Regions Management",
        headers: ["S.No.", "Name", "State"],
        data: regionsWithState,
        renderRow: (item, index, onDelete) => (
          <tr key={item.id} className="hover:bg-slate-50">
            <td className="px-6 py-4 w-16 text-sm font-medium text-slate-900">
              {index + 1}
            </td>
            <td className="px-6 py-4 text-sm text-slate-600">{item.name}</td>
            <td className="px-6 py-4 text-sm text-slate-500">
              {item.stateName}
            </td>
            {/* <td className="px-6 py-4 text-sm text-slate-500">
              {item.language}
            </td> */}
            <td className="px-6 py-4 text-right">
              <button
                onClick={() => onDelete(item)}
                className="text-red-600 hover:text-red-800 flex items-center gap-1.5"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </td>
          </tr>
        ),
      },
      villages: {
        title: "Villages Management",
        headers: ["S.No.", "Name", "Region", "Latitude", "Longitude"],
        data: villagesWithRegionAndState,
        renderRow: (item, index, onDelete) => (
          <tr key={item.id} className="hover:bg-slate-50">
            <td className="px-6 py-4 w-16 text-sm font-medium text-slate-900">
              {index + 1}
            </td>
            <td className="px-6 py-4 text-sm text-slate-600">{item.name}</td>
            <td className="px-6 py-4 text-sm text-slate-500">
              {item.regionName}
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">
              {item.latitude || "--"}
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">
              {item.longitude || "--"}
            </td>
            <td className="px-6 py-4 text-right">
              <button
                onClick={() => onDelete(item)}
                className="text-red-600 hover:text-red-800 flex items-center gap-1.5"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </td>
          </tr>
        ),
      },
    };

    const config = configs[activeTab];

    return (
      <div className="bg-transparent mt-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-slate-800">{config.title}</h2>
          <button
            onClick={() => handleOpenModal("add")}
            className="flex items-center justify-center px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-sm transition-all duration-200 transform hover:scale-105"
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Add New{" "}
            {activeTab.slice(0, -1)}
          </button>
        </div>
        {error && !modal.isOpen && <ErrorDisplay message={error} />}
        <CustomTable
          headers={config.headers}
          data={config.data}
          onDelete={(item) => handleOpenModal("delete", item)}
          renderRow={config.renderRow}
        />
      </div>
    );
  };

  return (
   <div className="flex min-h-screen bg-slate-50 font-sans">
    <Sidebar activePage="Manage Locations" />
       <main className="flex-1 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Manage Locations
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Manage all geographic locations for the system.
        </p>

        <div className="border-b border-slate-200 mt-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {["states", "regions", "villages"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-base capitalize transition-colors ${
                  activeTab === tab
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        {renderContent()}
      </div>
      </main>
      <AddModal
        isOpen={modal.type === "add" && modal.isOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        type={activeTab}
        parentData={activeTab === "regions" ? states : regions}
        isSaving={loading.action}
        allStates={states}
        allRegions={regions}
        allVillages={villages}
      />
      <DeleteModal
        isOpen={modal.type === "delete" && modal.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        item={modal.item}
        isDeleting={loading.action}
      />
    </div>
  );
}