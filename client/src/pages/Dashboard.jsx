import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  fetchLocations,
  fetchTrialsPerCity,
  fetchDemographics,
} from "@store/analyticsSlice";

import DemographicsChart from "@components/charts/DemographicsChart";
import LocationChart from "@components/charts/LocationChart";
import TrialsPerCityChart from "@components/charts/TrialsPerCityChart";
import Sidebar from "@components/Sidebar";
import OfficialsTable from "@components/tables/OfficialsTable";
import hamburger from "@assets/hamburger.svg";

const Dashboard = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.analytics.status, shallowEqual);
  const [activeView, setActiveView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLocations());
      dispatch(fetchDemographics());
      dispatch(fetchTrialsPerCity());
    }
  }, [status, dispatch]);

  const renderContent = () => {
    switch (activeView) {
      case "demographics":
        return <DemographicsChart isFullDisplay={true} />;
      case "trials":
        return <TrialsPerCityChart isFullDisplay={true} />;
      case "locations":
        return <LocationChart  isFullDisplay={true} />;
      default:
        return (
          <div className="my-5">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <DemographicsChart />
              <LocationChart />
              <TrialsPerCityChart />
            </div>
            <OfficialsTable />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F6] text-[#1E1E1E]">
      <div className="fixed top-0 left-0 w-full h-16 bg-white text-[#333] flex items-center justify-between px-4 md:hidden z-40 border-b border-gray-200 shadow-sm">
        <h1 className="text-lg font-semibold text-[#222]">SIRO Analytics</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="focus:outline-none text-[#5F5F5F] hover:text-[#F5B301] transition"
        >
          <img
            src={hamburger}
            alt="menu"
            className="h-6 w-6 opacity-80 hover:opacity-100 transition"
          />
        </button>
      </div>

      <Sidebar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          setSidebarOpen(false);
        }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "md:ml-64"
        } pt-20 md:pt-16 px-4 sm:px-6 lg:px-8`}
      >
        <div className="m-4 max-w-7xl mx-auto space-y-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
