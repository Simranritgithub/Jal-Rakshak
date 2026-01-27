import React, { useState } from "react";
import axios from "../../../utils/axiosInstance";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  // Assuming backend sends a token in the email link
  //const token = searchParams.get("token");
  //console.log(resetToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      console.log(resetToken, password);
      const res = await axios.post(
        "/enroll/set-password", // your backend API
        { resetToken, password }
      );

      setSuccess(res.data.message || "Password set successfully!");
      setTimeout(() => navigate("/"), 2000); // redirect to login
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Set Your Password
        </h2>
        {error && (
          <p className="p-2 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </p>
        )}
        {success && (
          <p className="p-2 text-sm text-green-600 bg-green-100 rounded-md">
            {success}
          </p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Setting..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
