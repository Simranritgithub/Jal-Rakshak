import React, { useState, useEffect } from "react";
import { Bell, UserCircle, Droplets } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        bg-white/60 backdrop-blur-xl
        border-b border-[#6AECE1]/40
        shadow-sm
      "
    >
      <div className="h-16 flex items-center justify-between px-6 w-full max-w-7xl mx-auto">

        {/* BRAND */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div
            className="
              w-9 h-9 rounded-xl
              bg-[#26CCC2]
              flex items-center justify-center
              shadow-sm
            "
          >
            <Droplets className="text-white" size={18} />
          </div>

          <h1 className="text-lg font-bold text-[#26CCC2]">
            JalRakshak
          </h1>
        </div>

        {/* LINKS */}
        <div className="hidden md:flex gap-8">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-[#26CCC2] font-semibold"
                : "text-[#2D3436] hover:text-[#26CCC2]"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/water-reports"
            className={({ isActive }) =>
              isActive
                ? "text-[#26CCC2] font-semibold"
                : "text-[#2D3436] hover:text-[#26CCC2]"
            }
          >
            Water Reports
          </NavLink>
           <NavLink
            to="/admin/asharequests"
            className={({ isActive }) =>
              isActive
                ? "text-[#26CCC2] font-semibold"
                : "text-[#2D3436] hover:text-[#26CCC2]"
            }
          >
            AshaWorkers
          </NavLink>

          <NavLink
            to="/admin/alerts"
            className={({ isActive }) =>
              isActive
                ? "text-[#26CCC2] font-semibold"
                : "text-[#2D3436] hover:text-[#26CCC2]"
            }
          >
            Alerts
          </NavLink>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button
            className="
              relative p-2 rounded-full
              hover:bg-[#6AECE1]/20
              transition
            "
          >
            <Bell size={18} className="text-[#2D3436]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFB76C] rounded-full"></span>
          </button>

          {/* User */}
          <div className="flex items-center gap-2">
            <UserCircle size={22} className="text-[#26CCC2]" />
            <span className="text-sm font-medium text-[#2D3436]">
              {user?.name || "User"}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              text-sm font-medium
              text-[#FFB76C]
              hover:opacity-80
              transition
            "
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
