import React from "react";
import Navbar from "./Navbar";

const MyWaterReport = () => {
  return (
    <div
      className=" min-h-screen
        bg-gradient-to-br
        from-[#6AECE1]
        via-[#26CCC2]
        to-[#15173D]
        font-sans p-16
      "
    >
      <Navbar />
      <div className="w-full max-w-7xl mx-auto relative top-4">
        <h1 className="text-4xl font-extrabold text-[#15173D]">
          Review Water Report
        </h1>

        <p className="mt-2 text-white text-lg">
          Review water quality readings for villages and communities.
        </p>
      </div>
      <div className="relative top-4 flex flex-col"></div>
    </div>
  );
};
export default MyWaterReport;
