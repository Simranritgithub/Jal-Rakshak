import React, { useState } from "react";
import instance from "../utils/axiosInstance";
import Glasscard from "../components/Glasscard";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

const AshaWorkerProfile = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    gender: "",
    phone: "",
    address: "",
    state: "",
    district: "",
    village: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await instance.post("/auth/asha/profile",
        {
          age: form.age,
          gender: form.gender,
          phone: form.phone,
          address: form.address,
          location: {
            state: form.state,
            district: form.district,
            village: form.village
          }
        }
      );

      if (res.data.success) {
        navigate("/asha/dashboard");
      }

    } catch (err) {
      console.log(err.response?.data?.message || "Profile creation failed");
    }
  };

  return (
     <div className="min-h-screen relative flex items-center justify-end px-12 overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage:
              "url('https://www.worldbank.org/content/dam/photos/780x439/2016/sep-3/Oct---Mahmud-MapBGD-MR-2006-0006429.JPG')",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br 
          from-[#6AECE1]/60
          via-[#26CCC2]/55
          to-[#FFB76C]/80
        " />

        {/* Glass Card */}
        <Glasscard className="relative z-10 w-full max-w-2xl p-10">
        {/* HEADER */}
        

        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-[#15173D]">
            Create ASHA Profile
          </h1>
          <p className="text-[#15173D]">
            Please complete your profile to continue
          </p>
        </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
          >

            <InputField label="Age" name="age" value={form.age} onChange={handleChange} />
            <InputField label="Gender" name="gender" value={form.gender} onChange={handleChange} />
            <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
            <InputField label="Address" name="address" value={form.address} onChange={handleChange} />

            <InputField label="State" name="state" value={form.state} onChange={handleChange} />
            <InputField label="District" name="district" value={form.district} onChange={handleChange} />
            <InputField label="Village" name="village" value={form.village} onChange={handleChange} />

            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="
                  bg-[#26CCC2]
                  text-white
                  px-10 py-2
                  rounded-lg
                  hover:opacity-90
                "
              >
                Save Profile
              </button>
            </div>

          </form>

        </Glasscard>

      </div>
    
  );
};

/* ---------- InputField FIELD ---------- */

// const InputField = ({ label, name, value, onChange }) => (
//   <div>
//     <p className="text-sm font-medium text-[#4A8B88] mb-1">
//       {label}
//     </p>
//     <InputField
//       name={name}
//       value={value}
//       onChange={onChange}
//       required
//       className="
//         w-full
//         bg-white
//         border border-[#6AECE1]/40
//         rounded-lg
//         p-2
//         text-[#2D3436]
//         focus:outline-none
//         focus:ring-2
//         focus:ring-[#26CCC2]
//       "
//     />
//   </div>
// );

export default AshaWorkerProfile;
