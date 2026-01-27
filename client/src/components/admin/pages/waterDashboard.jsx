import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Tooltip,
} from "recharts";
import axiosInstance from "../../../utils/axiosInstance"; // Kept your original axiosInstance import
import Sidebar from "../../sidebar"; // Kept your original Sidebar import

const chartConfig = {
  temperature: { label: "Temperature (°C)", color: "#3b82f6" }, // Blue
  ph_value: { label: "pH Value", color: "#16a34a" }, // Green
  water_level: { label: "Water Level", color: "#f97316" }, // Orange
};

const WATER_LEVEL_COLORS = {
  High: "#3b82f6", // Blue
  Medium: "#16a34a", // Green
  Low: "#ef4444", // Red
};

// A custom tooltip for styling
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 text-sm bg-white rounded-lg shadow-md border border-gray-200">
        <p className="font-bold text-gray-700">{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${Number(entry.value).toFixed(2)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Renamed to better reflect its role as the main content area
const AnalyticsContent = () => {
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("trends");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/sensor_data");
        setSensorData(response.data.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch sensor data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading sensor data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-96 p-6 bg-white rounded-lg shadow-md border">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const processedData =
    sensorData
      ?.map((item, index) => ({
        ...item,
        time: new Date(item.timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: new Date(item.timestamp).toLocaleDateString(),
        index: index + 1,
      }))
      .reverse() || [];

  const waterLevelDistribution =
    sensorData?.reduce((acc, item) => {
      acc[item.water_level] = (acc[item.water_level] || 0) + 1;
      return acc;
    }, {}) || {};

  const pieData = Object.entries(waterLevelDistribution).map(
    ([level, count]) => ({
      name: level,
      value: count,
      color: WATER_LEVEL_COLORS[level],
    })
  );

  const latestReading = processedData.length > 0 ? processedData[processedData.length - 1] : null;

  // FIX: Added check to prevent division by zero when processedData is empty.
  const avgTemperature =
    processedData.length > 0
      ? processedData.reduce((sum, item) => sum + item.temperature, 0) / processedData.length
      : 0;

  // FIX: Added check to prevent division by zero when processedData is empty.
  const avgPH =
    processedData.length > 0
      ? processedData.reduce((sum, item) => sum + item.ph_value, 0) / processedData.length
      : 0;

  return (
    <main className="flex-1 p-6 space-y-6 overflow-y-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">
          Pond Sensor Analytics
        </h1>
        <p className="text-gray-500">
          Real-time monitoring and analysis of pond environmental conditions as
          of{" "}
          {new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 pb-2">
            Latest Temperature
          </h3>
          <div className="text-2xl font-bold text-gray-800">
            {/* FIX: Added optional chaining to prevent error if latestReading or its properties are undefined */}
            {latestReading?.temperature?.toFixed(1) ?? 'N/A'}°C
          </div>
          <p className="text-xs text-gray-400">
            Avg: {avgTemperature.toFixed(1)}°C
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 pb-2">
            Latest pH Level
          </h3>
          <div className="text-2xl font-bold text-gray-800">
            {/* FIX: Added optional chaining */}
            {latestReading?.ph_value?.toFixed(2) ?? 'N/A'}
          </div>
          <p className="text-xs text-gray-400">Avg: {avgPH.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 pb-2">
            Water Level
          </h3>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              latestReading?.water_level === "High"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {latestReading?.water_level ?? 'N/A'}
          </span>
          <p className="text-xs text-gray-400 mt-1">Current status</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 pb-2">
            Total Readings
          </h3>
          <div className="text-2xl font-bold text-gray-800">
            {processedData.length}
          </div>
          <p className="text-xs text-gray-400">
            Last updated: {latestReading?.time ?? 'N/A'}
          </p>
        </div>
      </div>

      {/* Charts with Tabs */}
      <div>
        <div className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gray-100 p-1 rounded-md mb-4">
          <button onClick={() => setActiveTab("trends")} className={`px-3 py-1.5 text-sm font-medium rounded-sm ${ activeTab === "trends" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:bg-gray-200/50" }`}>Trends</button>
          <button onClick={() => setActiveTab("combined")} className={`px-3 py-1.5 text-sm font-medium rounded-sm ${ activeTab === "combined" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:bg-gray-200/50" }`}>Combined</button>
          <button onClick={() => setActiveTab("distribution")} className={`px-3 py-1.5 text-sm font-medium rounded-sm ${ activeTab === "distribution" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:bg-gray-200/50" }`}>Distribution</button>
          <button onClick={() => setActiveTab("correlation")} className={`px-3 py-1.5 text-sm font-medium rounded-sm ${ activeTab === "correlation" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:bg-gray-200/50" }`}>Correlation</button>
        </div>
        <div>
          {activeTab === "trends" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800">Temperature Over Time</h3>
                <p className="text-sm text-gray-500 mb-4">Temperature readings throughout the monitoring period</p>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={processedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="temperature" stroke={chartConfig.temperature.color} strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800">pH Levels Over Time</h3>
                <p className="text-sm text-gray-500 mb-4">pH value changes throughout the monitoring period</p>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={processedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[6, 8]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="ph_value" stroke={chartConfig.ph_value.color} fill={chartConfig.ph_value.color} fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          {activeTab === "combined" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800">Temperature & pH Combined Analysis</h3>
              <p className="text-sm text-gray-500 mb-4">Dual-axis view of temperature and pH levels over time</p>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={processedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="temp" orientation="left" stroke={chartConfig.temperature.color}/>
                    <YAxis yAxisId="ph" orientation="right" domain={[6, 8]} stroke={chartConfig.ph_value.color}/>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area yAxisId="temp" type="monotone" dataKey="temperature" name="Temperature" stroke={chartConfig.temperature.color} fill={chartConfig.temperature.color} fillOpacity={0.3} />
                    <Line yAxisId="ph" type="monotone" dataKey="ph_value" name="pH Value" stroke={chartConfig.ph_value.color} strokeWidth={3}/>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {activeTab === "distribution" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800">Water Level Distribution</h3>
                <p className="text-sm text-gray-500 mb-4">Proportion of different water level readings</p>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` } outerRadius={80} fill="#8884d8" dataKey="value" >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800">Reading Frequency</h3>
                <p className="text-sm text-gray-500 mb-4">Number of readings per time period</p>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processedData.slice(-10)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="index" name="Reading" fill={chartConfig.water_level.color}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          {activeTab === "correlation" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800">Temperature vs pH Correlation</h3>
              <p className="text-sm text-gray-500 mb-4">Relationship between temperature and pH levels</p>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={processedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="temperature" type="number" name="Temperature" unit="°C" domain={["dataMin - 1", "dataMax + 1"]}/>
                    <YAxis dataKey="ph_value" type="number" name="pH" domain={[6, 8]}/>
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="ph_value" strokeWidth={0} dot={{ r: 6, fill: chartConfig.ph_value.color }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

// Main Page Component that combines Sidebar and Content
export default function AnalyticsPage() {
  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      {/* Set the active page prop to highlight the correct link */}
      <Sidebar activePage="Water Reports" />
      <AnalyticsContent />
    </div>
  );
}