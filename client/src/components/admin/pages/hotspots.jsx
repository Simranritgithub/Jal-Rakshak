import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar";
// --- SVG Icons (self-contained) ---
const Bell = ({ className, size = 20 }) => (
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
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const Search = ({ className }) => (
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronDown = ({ className }) => (
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
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Calendar = ({ className }) => (
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
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const ColorMapPin = ({ colorClass, className, children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      className={colorClass}
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
    />
    <circle
      cx="12"
      cy="9"
      r="2.5"
      fill="white"
      stroke="#333"
      strokeWidth="0.5"
    />
    {children}
  </svg>
);

// --- Icons for Sidebar ---
const LayoutDashboard = ({ size = 20, className }) => (
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
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const Droplets = ({ size = 20, className }) => (
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
    <path d="M7 16.3c0-2 1.2-3.4 3-4.4 1.8-1 3-2.3 3-4.4 0-2.4-1.9-4.5-4.5-4.5S4 5.5 4 7.9c0 2 1.2 3.4 3 4.4Z" />
    <path d="m14 14-1.2 1.2" />
    <path d="M19.3 12.3c0-2.4-1.9-4.5-4.5-4.5s-4.5 2.1-4.5 4.5c0 2 1.2 3.4 3 4.4 1.8 1 3 2.3 3 4.4" />
  </svg>
);

const FileText = ({ size = 20, className }) => (
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const Megaphone = ({ size = 20, className }) => (
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
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
);

const CircleHelp = ({ size = 20, className }) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const Send = ({ size = 16, className }) => (
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
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

// --- Mock Data ---
const initialHotspotData = {
  id: "68c410a4aa894ebab22db047",
  date: new Date().toISOString(),
  anomalyScore: -0.088,
  isAnomaly: true,
  riskLevel: "MEDIUM",
  riskProbability: 0.657,
  predictionTimestamp: new Date().toISOString(),
  diseases: ["Dengue", "Malaria", "Viral Fever"],
  recommendation:
    "Moderate risk. Increase surveillance of stagnant water and monitor for fever clusters. Advise residents on mosquito protection.",
  village: {
    id: "68c3f1e91314cfb456cf72a8",
    name: "Sunnyvale",
    latitude: 28.6139,
    longitude: 77.209,
  },
};
const allVillagesData = [
  { ...initialHotspotData },
  {
    id: "village002",
    riskLevel: "HIGH",
    riskProbability: 0.89,
    diseases: ["Dengue"],
    village: { name: "Riverdale", latitude: 28.63, longitude: 77.2167 },
  },
  {
    id: "village003",
    riskLevel: "LOW",
    riskProbability: 0.15,
    diseases: ["Common Cold"],
    village: { name: "Greenfield", latitude: 28.59, longitude: 77.23 },
  },
  {
    id: "village004",
    riskLevel: "HIGH",
    riskProbability: 0.92,
    diseases: ["Malaria"],
    village: { name: "Red Valley", latitude: 28.6448, longitude: 77.2167 },
  },
  {
    id: "village005",
    riskLevel: "LOW",
    riskProbability: 0.08,
    diseases: ["-"],
    village: { name: "Safe Haven", latitude: 28.58, longitude: 77.19 },
  },
];

// --- Helper & Sub-components ---

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Hotspot Map</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live Health Risk Monitoring for Delhi, India
          </p>
        </div>
        <div className="text-right text-gray-500">
          <p className="font-semibold text-lg text-gray-600">
            {time.toLocaleTimeString("en-IN")}
          </p>
          <p className="text-sm">
            {time.toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="relative mt-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for a village, disease, or risk level..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-800 placeholder-gray-400"
        />
      </div>
    </header>
  );
};

const AlertOptions = () => (
  <div className="ui-panel">
    <h2 className="panel-title">Emergency Alerts</h2>
    <div className="space-y-3">
      {["Send to All", "Officials", "Villagers", "Health Workers"].map(
        (text) => (
          <button
            key={text}
            className="w-full bg-gradient-to-r from-red-500 to-orange-400 text-white font-semibold py-2.5 px-4 rounded-lg hover:shadow-[0_10px_20px_-10px_rgba(239,68,68,0.6)] transition-all shadow-md flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
          >
            <Send size={16} />
            <span>Alert {text}</span>
          </button>
        )
      )}
    </div>
  </div>
);

const HotspotDetails = ({ selectedHotspot }) => (
  <div className="ui-panel">
    <h2 className="panel-title">Selected Hotspot</h2>
    <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-200/80">
      <div className="flex items-center">
        <img
          src={`https://placehold.co/80x80/E2E8F0/EF4444?text=${selectedHotspot.village.name.substring(
            0,
            1
          )}`}
          alt="Village"
          className="w-16 h-16 rounded-md object-cover mr-4 border-2 border-gray-300"
        />
        <div>
          <h3 className="font-bold text-lg text-gray-800">
            {selectedHotspot.village.name}
          </h3>
          <p className="text-sm text-gray-500">
            Diseases:{" "}
            <span className="font-medium text-gray-700">
              {selectedHotspot.diseases.join(", ")}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Risk:{" "}
            <span
              className={`font-bold ${
                selectedHotspot.riskLevel === "HIGH"
                  ? "text-red-500"
                  : selectedHotspot.riskLevel === "MEDIUM"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {selectedHotspot.riskLevel}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CircularProgress = ({ percentage, color }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="w-full h-full" viewBox="0 0 120 120">
      <circle
        className="text-gray-200"
        strokeWidth="10"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
      />
      <circle
        className={color}
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
      />
      <text
        x="60"
        y="60"
        className="text-2xl font-bold fill-current text-gray-700 text-center"
        textAnchor="middle"
        dy=".3em"
      >
        {`${Math.round(percentage)}%`}
      </text>
    </svg>
  );
};

const AIRiskPrediction = ({ selectedHotspot }) => {
  const riskColor =
    selectedHotspot.riskLevel === "HIGH"
      ? "text-red-500"
      : selectedHotspot.riskLevel === "MEDIUM"
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <div className="ui-panel">
      <h2 className="panel-title">AI Risk Prediction</h2>
      <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-200/80">
        <div className="flex justify-between items-center">
          <div className="w-28 h-28">
            <CircularProgress
              percentage={selectedHotspot.riskProbability * 100}
              color={riskColor}
            />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Predicted Risk</p>
            <p className={`text-2xl font-bold ${riskColor}`}>
              {selectedHotspot.riskLevel}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Next Prediction: 24 hours
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 border-t border-gray-200 pt-3">
          <span className="font-semibold text-gray-600">Recommendation:</span>{" "}
          {selectedHotspot.recommendation}
        </p>
      </div>
    </div>
  );
};

const RecentAlertsLog = () => (
  <div className="ui-panel">
    <h2 className="panel-title">Recent Alerts Log</h2>
    <div className="space-y-3">
      <div className="flex items-center bg-gray-50/50 p-3 rounded-lg border border-gray-200/80">
        <div className="bg-red-100 p-2 rounded-full mr-3">
          <Bell className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <p className="font-semibold text-sm text-gray-800">
            Alert: High risk of Malaria in Red Valley
          </p>
          <p className="text-xs text-gray-500">
            Sent: 2 hours ago to Officials
          </p>
        </div>
      </div>
      <div className="flex items-center bg-gray-50/50 p-3 rounded-lg border border-gray-200/80">
        <div className="bg-yellow-100 p-2 rounded-full mr-3">
          <Bell className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
          <p className="font-semibold text-sm text-gray-800">
            Alert: Dengue surveillance in Sunnyvale
          </p>
          <p className="text-xs text-gray-500">
            Sent: 8 hours ago to Health Workers
          </p>
        </div>
      </div>
    </div>
  </div>
);

const MapZonePin = ({ village, setSelectedHotspot, bbox, isSelected }) => {
  const isHighRisk = village.riskLevel === "HIGH";
  const isMediumRisk = village.riskLevel === "MEDIUM";
  const pinColor = isHighRisk
    ? "fill-red-500"
    : isMediumRisk
    ? "fill-yellow-500"
    : "fill-green-500";
  const shadowStyle = isHighRisk
    ? "drop-shadow-[0_4px_8px_rgba(239,68,68,0.4)]"
    : isMediumRisk
    ? "drop-shadow-[0_4px_8px_rgba(245,158,11,0.4)]"
    : "drop-shadow-[0_4px_8px_rgba(34,197,94,0.4)]";

  // Position pin accurately within the map's bounding box
  const left =
    ((village.village.longitude - bbox.minLon) / (bbox.maxLon - bbox.minLon)) *
      100 +
    "%";
  const top =
    ((bbox.maxLat - village.village.latitude) / (bbox.maxLat - bbox.minLat)) *
      100 +
    "%";

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-full group cursor-pointer"
      style={{ top, left }}
      onClick={() => setSelectedHotspot(village)}
    >
      {(isHighRisk || isMediumRisk) && (
        <div
          className={`absolute top-0 left-0 w-full h-full rounded-full ${
            isHighRisk ? "bg-red-500/50" : "bg-yellow-500/50"
          } animate-ping`}
        ></div>
      )}
      <ColorMapPin
        colorClass={pinColor}
        className={`relative w-10 h-10 ${shadowStyle} transition-transform duration-300 ${
          isSelected ? "scale-125" : "group-hover:scale-110"
        }`}
      />
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
        {village.village.name}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-slate-800"></div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [selectedHotspot, setSelectedHotspot] = useState(allVillagesData[0]);

  // Calculate a bounding box to contain all villages for the map view
  const lats = allVillagesData.map((v) => v.village.latitude);
  const lons = allVillagesData.map((v) => v.village.longitude);
  const bbox = {
    minLon: Math.min(...lons) - 0.02,
    minLat: Math.min(...lats) - 0.01,
    maxLon: Math.max(...lons) + 0.02,
    maxLat: Math.max(...lats) + 0.01,
  };

  const stats = {
    activeHotspots: allVillagesData.filter((v) => v.riskLevel !== "LOW").length,
    villagesAtRisk: allVillagesData.filter(
      (v) => v.riskLevel === "HIGH" || v.riskLevel === "MEDIUM"
    ).length,
    safeVillages: allVillagesData.filter((v) => v.riskLevel === "LOW").length,
  };

  const FilterButton = ({ children, icon: Icon }) => (
    <button className="flex items-center bg-white border border-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors">
      {Icon && <Icon className="w-4 h-4 mr-2 text-gray-400" />}
      {children}
      <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
    </button>
  );

  return (
    <>
      <style>{`
          .ui-panel {
              @apply bg-white/60 backdrop-blur-lg border border-gray-200/80 rounded-2xl p-4 mb-6 shadow-sm;
              animation: fadeIn 0.5s ease-out forwards;
          }
          .panel-title {
              @apply text-lg font-semibold text-gray-700 mb-3;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      <div className="flex bg-gray-100 text-gray-800 min-h-screen font-sans">
        <Sidebar activePage="Hotspots" />
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex flex-col xl:flex-row gap-8 max-w-screen-2xl mx-auto">
            {/* Left Details Panel */}
            <aside className="w-full xl:w-1/3 xl:max-w-md flex-shrink-0">
              <AlertOptions />
              <HotspotDetails selectedHotspot={selectedHotspot} />
              <AIRiskPrediction selectedHotspot={selectedHotspot} />
              <RecentAlertsLog />
            </aside>
            {/* Main Content: Map and Stats */}
            <main className="flex-1 min-w-0">
              <Header />
              <div className="flex flex-wrap gap-3 mb-4">
                <FilterButton>Region</FilterButton>
                <FilterButton>Disease</FilterButton>
                <FilterButton>Risk Level</FilterButton>
                <FilterButton icon={Calendar}>Date Range</FilterButton>
              </div>
              {/* Map Area */}
              <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-2 h-[65vh]">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox.minLon}%2C${bbox.minLat}%2C${bbox.maxLon}%2C${bbox.maxLat}&layer=mapnik`}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  {allVillagesData.map((village) => (
                    <MapZonePin
                      key={village.id}
                      village={village}
                      setSelectedHotspot={setSelectedHotspot}
                      bbox={bbox}
                      isSelected={selectedHotspot.id === village.id}
                    />
                  ))}
                </div>
              </div>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  {
                    label: "Total Hotspots",
                    value: stats.activeHotspots,
                    color: "red",
                  },
                  {
                    label: "Villages at Risk",
                    value: stats.villagesAtRisk,
                    color: "yellow",
                  },
                  {
                    label: "Safe Villages",
                    value: stats.safeVillages,
                    color: "green",
                  },
                  { label: "Alerts Sent Today", value: 3, color: "blue" },
                ].map((card, index) => (
                  <div
                    key={card.label}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={`bg-white p-4 rounded-xl border-t-4 border-${card.color}-500 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl opacity-0 animate-fadeIn`}
                  >
                    <p className="text-gray-500 text-sm font-medium">
                      {card.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
