import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  Settings,
  Bell,
  ChevronRight,
  PlusCircle,
  Archive,
  ArrowUpRight,
  BarChart2,
  Send,
  Users,
  Target,
  UsersRound,
  Building2,
  Rocket,
  LayoutDashboard,
  Droplets,
  FileText,
  Megaphone,
  MapPin,
  CircleHelp,
} from "lucide-react";
import Sidebar from "../../sidebar";
// --- Components defined in the same file to prevent import errors ---

const StatCard = ({ title, value, icon: Icon, change }) => (
  <div className="bg-white p-4 rounded-lg border border-slate-200/80 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-violet-100 rounded-lg">
      <Icon className="w-6 h-6 text-violet-600" />
    </div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs font-semibold text-green-600 flex items-center">
          <ArrowUpRight size={12} className="mr-0.5" />
          {change}
        </p>
      </div>
    </div>
  </div>
);

const Header = () => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Awareness Programs</h1>
      <div className="flex items-center text-sm text-slate-500 mt-1">
        <span>Dashboard</span> <ChevronRight size={16} />{" "}
        <span className="font-medium text-slate-700">Campaigns</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search Campaigns..."
          className="pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-300 w-64 focus:ring-2 focus:ring-violet-500 focus:outline-none"
        />
      </div>
      <button className="p-2.5 rounded-lg border bg-white text-slate-600 hover:bg-slate-50">
        <Settings size={18} />
      </button>
      <button className="p-2.5 rounded-lg border bg-white text-slate-600 hover:bg-slate-50">
        <Bell size={18} />
      </button>
      <img
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        alt="User"
        className="w-10 h-10 rounded-full"
      />
    </div>
  </div>
);

const AwarenessContent = () => {
  const campaignsPerMonth = [
    { name: "Jan", campaigns: 4 },
    { name: "Feb", campaigns: 6 },
    { name: "Mar", campaigns: 5 },
    { name: "Apr", campaigns: 8 },
    { name: "May", campaigns: 7 },
    { name: "Jun", campaigns: 10 },
  ];
  const methodsUsage = [
    { name: "Door-to-Door", value: 85 },
    { name: "Pamphlets", value: 60 },
    { name: "Events", value: 75 },
    { name: "Radio", value: 40 },
  ];

  return (
    <main className="flex-1 p-6 bg-slate-50/50">
      <Header />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 text-sm font-semibold text-violet-700 bg-violet-100 border border-violet-200 rounded-md shadow-sm">
              Active
            </button>
            <button className="px-4 py-1.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-md">
              Completed
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-violet-600 rounded-lg shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
            <PlusCircle size={16} /> New Campaign
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Campaigns"
            value="123"
            icon={Target}
            change="+5"
          />
          <StatCard
            title="Active Campaigns"
            value="15"
            icon={Rocket}
            change="+2"
          />
          <StatCard
            title="Completed"
            value="110"
            icon={UsersRound}
            change="+3"
          />
          <StatCard
            title="Villages Covered"
            value="500"
            icon={Building2}
            change="+50"
          />
          <StatCard
            title="People Reached"
            value="50k"
            icon={Users}
            change="+5k"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 flex items-center gap-6 shadow-sm">
              <img
                src="https://storage.googleapis.com/gemini-prod/images/ORGANIC_3e44431f-0b31-4f11-8208-a5f1a3034f59.png"
                alt="Awareness Program"
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-lg">
                  Launch Awareness Program
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Select a template or create a new campaign to spread awareness
                  about important issues.
                </p>
              </div>
              <button className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-700 whitespace-nowrap">
                <Rocket size={16} /> Start
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">
                Active Campaigns List
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                    <tr>
                      <th className="p-3">Campaign</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Start Date</th>
                      <th className="p-3">End Date</th>
                      <th className="p-3">Villages</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-medium text-slate-800">
                        Campaign A
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">2025-08-01</td>
                      <td className="p-3 text-slate-600">2025-08-31</td>
                      <td className="p-3 text-slate-600">Village Set 1</td>
                      <td className="p-3">
                        <a
                          href="#"
                          className="font-medium text-violet-600 hover:underline"
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-medium text-slate-800">
                        Campaign B
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">
                          Completed
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">2025-07-15</td>
                      <td className="p-3 text-slate-600">2025-08-15</td>
                      <td className="p-3 text-slate-600">Village Set 2</td>
                      <td className="p-3">
                        <a
                          href="#"
                          className="font-medium text-violet-600 hover:underline"
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-medium text-slate-800">
                        Campaign C
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">2025-08-10</td>
                      <td className="p-3 text-slate-600">2025-09-10</td>
                      <td className="p-3 text-slate-600">Village Set 3</td>
                      <td className="p-3">
                        <a
                          href="#"
                          className="font-medium text-violet-600 hover:underline"
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-medium text-slate-800">
                        Campaign D
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">2025-08-12</td>
                      <td className="p-3 text-slate-600">2025-08-28</td>
                      <td className="p-3 text-slate-600">Village Set 4</td>
                      <td className="p-3">
                        <a
                          href="#"
                          className="font-medium text-violet-600 hover:underline"
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">
              Past Campaign Logs
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 rounded-md mt-1">
                  <Archive size={16} className="text-slate-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-800">
                    January 2025
                  </p>
                  <p className="text-xs text-slate-500">
                    Conducted 5 campaigns successfully.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 rounded-md mt-1">
                  <Archive size={16} className="text-slate-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-800">
                    February 2025
                  </p>
                  <p className="text-xs text-slate-500">
                    Reached 3,000 new individuals.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 rounded-md mt-1">
                  <Archive size={16} className="text-slate-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-800">
                    March 2025
                  </p>
                  <p className="text-xs text-slate-500">
                    Launched the Water Safety initiative.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800">
                    Campaigns per Month
                  </h3>
                  <p className="text-2xl font-bold">10</p>
                </div>
                <p className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <ArrowUpRight size={14} /> +12%
                </p>
              </div>
              <div className="h-48 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={campaignsPerMonth}
                    margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: "rgba(238, 242, 255, 0.6)" }} />
                    <Bar
                      dataKey="campaigns"
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800">
                    Awareness Methods Usage
                  </h3>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <p className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <ArrowUpRight size={14} /> +5%
                </p>
              </div>
              <div className="space-y-3 mt-4">
                {methodsUsage.map((method) => (
                  <div key={method.name}>
                    <p className="text-sm font-medium text-slate-600">
                      {method.name}
                    </p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-violet-500 h-2 rounded-full"
                        style={{ width: `${method.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200 flex flex-col shadow-sm">
            <h3 className="font-bold text-slate-800">Impact Analysis Panel</h3>
            <div className="my-4 p-4 bg-slate-50 rounded-lg border">
              <h4 className="font-semibold text-sm text-slate-700">
                AI-Powered Insights
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Door-to-door campaigns show 25% higher engagement. Consider
                increasing focus in the next phase.
              </p>
              <button className="text-xs font-semibold text-violet-600 mt-2 hover:underline">
                Details
              </button>
            </div>
            <div className="mt-auto space-y-2">
              <button className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
                <Send size={14} /> Send Summary to Officials
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
                <Users size={14} /> Notify Asha Workers
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-700">
                <BarChart2 size={14} /> Analyze
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// --- Main Page Component ---
const AwarenessDashboard = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar activePage="Awareness Programs" />
      <AwarenessContent />
    </div>
  );
};

export default AwarenessDashboard;
