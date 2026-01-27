import React from 'react';
import {
  LayoutDashboard,
  Droplets,
  Bell,
  FileText,
  Megaphone,
  MapPin,
  CircleHelp,
} from "lucide-react";

// In a real app, you would use a Link component from your router library
// e.g., import { Link } from 'react-router-dom';
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

const Sidebar = ({ activePage }) => {
  const navItems = [
    { name: "Enrollment", icon: LayoutDashboard, path: "/admin/enroll" },
    { name: "Water Reports", icon: Droplets, path: "/admin/water-reports" },
    { name: "Alerts", icon: Bell, path: "/admin/alerts" },
    { name: "Health Reports", icon: FileText, path: "/admin/health-reports" },
    { name: "Awareness Programs", icon: Megaphone, path: "/admin/awareness" },
    { name: "Hotspots", icon: MapPin, path: "/admin/hotspots" },
    { name: "Manage Locations", icon: MapPin, path: "/admin/manage-locations" },
  ];

  return (
    <aside className="w-64 bg-white flex flex-col p-4 border-r border-slate-200 h-screen sticky top-0">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-10 px-2 pt-2">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex-shrink-0"></div>
        <h1 className="text-xl font-bold text-slate-800">AquaSentials</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm font-medium ${
                    isActive
                      ? "bg-violet-100 text-violet-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Help Link */}
      <div className="mt-auto">
        <Link
          to="/help"
          className="flex items-center py-2.5 px-4 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium"
        >
          <CircleHelp size={20} className="mr-3" />
          <span>Help</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
// import React from "react";
// import {
//   LayoutDashboard,
//   Droplets,
//   Bell,
//   FileText,
//   Megaphone,   MapPin,
//   CircleHelp, } from "lucide-react";

// // --- UPDATE: The useLanguage hook is no longer needed here ---
// // import { useLanguage } from "../context/languageContext";

// const Link = ({ to, children, className }) => (
//   <a href={to} className={className}>
//     {children}
//   </a>
// );


// const Sidebar = ({ activePageKey, navItems, helpText }) => {
  

//   return (
//     <aside className="w-64 bg-white flex flex-col p-4 border-r border-slate-200 h-screen sticky top-0">
//       {/* Logo Section */}
//       <div className="flex items-center gap-3 mb-10 px-2 pt-2">
//         <div className="w-10 h-10 bg-blue-500 rounded-lg flex-shrink-0"></div>
//         <h1 className="text-xl font-bold text-slate-800">AquaSentials</h1>
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex-1">
//         <ul className="space-y-2">
//           {/* --- UPDATE: We map over the 'navItems' prop directly --- */}
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = activePageKey === item.key;
//             return (
//               <li key={item.key}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm font-medium ${
//                     isActive
//                       ? "bg-violet-100 text-violet-700"
//                       : "text-slate-600 hover:bg-slate-100"
//                   }`}
//                 >
//                   <Icon size={20} className="mr-3" />
//                   {/* --- UPDATE: Display the 'name' from the prop, which is already translated --- */}
//                   <span>{item.name}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* Footer Help Link */}
//       <div className="mt-auto">
//         <Link
//           to="/help"
//           className="flex items-center py-2.5 px-4 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium"
//         >
//           <CircleHelp size={20} className="mr-3" />
//           {/* --- UPDATE: Display the 'helpText' prop --- */}
//           <span>{helpText}</span>
//         </Link>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;