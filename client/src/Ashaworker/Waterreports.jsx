import React, { useState } from "react";
import instance from "../utils/axiosInstance";
import Glasscard from "../components/Glasscard";
import Navbar from "./Navbar";

const Waterreports = () => {
  const [form, setForm] = useState({
    location: {
      State: "",
      district: "",
      village: "",
    },

    ph: "",
    turbidity: "",
    tds: "",
    temperature: "",
    status: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await instance.post("/asha/create/samples", form);

      if (res.data.success) {
        alert("Water Sample Submitted Successfully");
        setForm({
          location: "",
          ph: "",
          turbidity: "",
          tds: "",
          temperature: "",
          status: "",
          remarks: "",
        });
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#6AECE1]
        via-[#26CCC2]
        to-[#15173D]
        font-sans
        p-10
      "
    >
      <Navbar />
      <div className="max-w-4xl mx-auto mt-16">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-[#15173D]">
            Create Water Report
          </h1>
          <p className="text-white mt-1 font-sans text-lg">
            Submit water quality measurements from field
          </p>
        </div>

        {/* FORM CARD */}
        <Glasscard className="p-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Input
              label="State"
              name="State"
              value={form.location.State}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: {
                    ...form.location,
                    State: e.target.value,
                  },
                })
              }
            />

            <Input
              label="District"
              name="district"
              value={form.location.district}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: {
                    ...form.location,
                    district: e.target.value,
                  },
                })
              }
            />

            <Input
              label="Village"
              name="village"
              value={form.location.village}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: {
                    ...form.location,
                    village: e.target.value,
                  },
                })
              }
            />

            <Input
              label="pH Level"
              name="ph"
              type="number"
              value={form.ph}
              onChange={handleChange}
            />

            <Input
              label="Turbidity"
              name="turbidity"
              type="number"
              value={form.turbidity}
              onChange={handleChange}
            />

            <Input
              label="TDS"
              name="tds"
              type="number"
              value={form.tds}
              onChange={handleChange}
            />

            <Input
              label="Temperature (°C)"
              name="temperature"
              type="number"
              value={form.temperature}
              onChange={handleChange}
            />

            {/* STATUS */}
            <div>
              <p className="text-sm font-medium text-[#4A8B88] mb-1">
                Water Status
              </p>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                required
                className="
                  w-full
                  bg-white
                  border border-[#6AECE1]/40
                  rounded-lg
                  p-2
                  text-[#2D3436]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#26CCC2]
                "
              >
                <option value="">Select Status</option>
                <option value="Safe">Safe</option>
                <option value="Warning">Warning</option>
                <option value="Unsafe">Unsafe</option>
              </select>
            </div>

            {/* REMARKS */}
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-[#4A8B88] mb-1">Remarks</p>

              <textarea
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                rows="4"
                className="
                  w-full
                  bg-white
                  border border-[#6AECE1]/40
                  rounded-lg
                  p-2
                  text-[#2D3436]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#26CCC2]
                "
              />
            </div>

            {/* BUTTON */}
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
                Submit Report
              </button>
            </div>
          </form>
        </Glasscard>
      </div>
    </div>
  );
};

/* ---------------- INPUT COMPONENT ---------------- */

const Input = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <p className="text-sm font-medium text-[#4A8B88] mb-1">{label}</p>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="
        w-full
        bg-white
        border border-[#6AECE1]/40
        rounded-lg
        p-2
        text-[#2D3436]

        focus:outline-none
        focus:ring-2
        focus:ring-[#26CCC2]
      "
    />
  </div>
);

export default Waterreports;
