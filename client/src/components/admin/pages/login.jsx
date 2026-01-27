// import React, { useState } from "react";
// import axios from "axios";
// import { FaUserShield } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5001/api/auth/login", {
//         email: formData.email,
//         password: formData.password,
//         role: "ADMIN",
//       });

//       if (res.data.success) {
//         // Save token to localStorage
//         localStorage.setItem("token", res.data.data.token);
//         localStorage.setItem("role", res.data.data.role);
//         localStorage.setItem("userId", res.data.data.id);

//         navigate("/admin/enroll"); // Redirect to enrollment dashboard
//       } else {
//         setError(res.data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login Error:", err);
//       setError(
//         err.response?.data?.message || "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-slate-100">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
//         {/* Header */}
//         <div className="flex items-center justify-center mb-6">
//           <FaUserShield className="text-blue-600 text-3xl mr-2" />
//           <h2 className="text-2xl font-bold text-slate-800">
//             AquaSentials Admin Login
//           </h2>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 text-red-600 text-sm bg-red-50 p-2 rounded-md">
//             {error}
//           </div>
//         )}

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm text-slate-600">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-slate-600">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
import React, { useState } from "react";
import axios from "axios";
import { FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        const { token, role, id } = res.data.data;

        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", id);

        // Redirect based on role
        switch (role) {
          case "ADMIN":
            navigate("/admin/enroll");
            break;
          case "HEALTH_OFFICIAL":
            navigate("/health/dashboard");
            break;
          case "ASHA_WORKER":
            navigate("/asha/dashboard");
            break;
          case "VOLUNTEER":
            navigate("/volunteer/dashboard");
            break;
          case "VILLAGER":
            navigate("/villager/dashboard");
            break;
          default:
            navigate("/"); // fallback
        }
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md transform transition duration-300 hover:scale-105">
        <div className="flex items-center justify-center mb-6">
          <FaUserShield className="text-blue-600 text-3xl mr-2" />
          <h2 className="text-2xl font-bold text-slate-800">
            Login
          </h2>
        </div>

        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
