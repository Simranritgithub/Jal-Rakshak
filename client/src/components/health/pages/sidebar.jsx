import React from 'react';
const LayoutDashboard = ({ size = 20, className = "" }) => (
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
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
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
const Droplets = ({ size = 20, className = "" }) => (
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
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.48-2.26-1.3-3.05a4.01 4.01 0 0 0-5.4 0c-.82.79-1.3 1.89-1.3 3.05C3 14.47 4.8 16.3 7 16.3z"></path>
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.52 1.28 1 2.62 1.5 4.02"></path>
    <path d="M18.81 9.87a9.29 9.29 0 0 0 2.19-5.85c.32.9.5 1.85.5 2.85 0 2.2-1.8 4-4 4"></path>
    <path d="M14 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.48-2.26-1.3-3.05a4.01 4.01 0 0 0-5.4 0c-.82.79-1.3 1.89-1.3 3.05C10 14.47 11.8 16.3 14 16.3z"></path>
  </svg>
);
const AlertTriangle = ({ size = 20, className = "" }) => (
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
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);
const Megaphone = ({ size = 20, className = "" }) => (
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
    <path d="M3 11v2a3 3 0 0 0 3 3h2"></path>
    <path d="M11 11H6a3 3 0 0 0-3 3v2"></path>
    <path d="M15 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1"></path>
    <path d="m11 11 4 4"></path>
    <path d="M11 15 7.5 11.5"></path>
    <path d="m15 12 5-5"></path>
  </svg>
);
const Bot = ({ size = 20, className = "" }) => (
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
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);
const CircleHelp = ({ size = 20, className = "" }) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
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

// --- Sidebar Component ---


const Sidebar = ({ activePage }) => {
  const navItems = [
    { name: "Village Stats", icon: LayoutDashboard, path: "/health/dashboard" },
    { name: "Task Status", icon: Bell, path: "/health/task" },
    {
      name: "Report Live Case",
      icon: Droplets,
      path: "/health/report-live-case",
    },
    { name: "Alerts", icon: AlertTriangle, path: "/health/alert" },
    { name: "Awareness Programs", icon: Megaphone, path: "/health/awareness" },
    { name: "AI chatbot", icon: Bot, path: "/health/chatbot" },
  ];

  return (
    <aside className="w-64 bg-white flex-shrink-0 flex flex-col p-4 border-r border-slate-200 h-screen sticky top-0">
      <div className="flex items-center gap-3 mb-10 px-2 pt-2">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <Droplets size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-800">AquaSentials</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;
            return (
              <li key={item.name}>
                <a
                  href={item.path}
                  className={`flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm font-medium ${
                    isActive
                      ? "bg-blue-100 text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  <span>{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto">
        <a
          href="#help"
          className="flex items-center py-2.5 px-4 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium"
        >
          <CircleHelp size={20} className="mr-3" />
          <span>Help</span>
        </a>
      </div>
    </aside>
  );
};
export default Sidebar;
