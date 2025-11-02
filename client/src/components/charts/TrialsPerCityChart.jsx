import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrialsPerCity } from "@store/analyticsSlice";
import BarChart from "./unit/BarChart";

const TrialsPerCityChart = ({isFullDisplay = false}) => {
  const dispatch = useDispatch();
  const { trialsPerCity, status, error, selectedYear } = useSelector(
    (state) => state.analytics
  );
  
  // Fetching data whenever the year changes
  useEffect(() => {
    dispatch(fetchTrialsPerCity({ startAfter: selectedYear }));
  }, [dispatch, selectedYear]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[280px] bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm sm:text-base font-medium text-gray-600">
          Loading trials per city...
        </p>
      </div>
    );
  }

  /* ------------------ Error ------------------ */
  if (error && status === "failed") {
    return (
      <div className="p-4 text-center bg-[#FFF7F7] border border-red-300 rounded-xl shadow-sm">
        <p className="font-semibold text-red-600 text-sm sm:text-base">
          ⚠ Data Error
        </p>
        <p className="text-xs sm:text-sm text-gray-600">
          Failed to load trials per city data.
        </p>
      </div>
    );
  }

  const chartData =
    (trialsPerCity || [])
      .filter((item) => item.city && item.count > 0)
      .map((item) => ({
        name: `${item.city} (${item.country || "N/A"})`,
        Facilities: item.count,
      })) || [];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 sm:p-6 hover:shadow-lg transition-all duration-300">
      {chartData.length > 0 ? (
        <BarChart
          title={`Top 10 Cities by Clinical Trial Facilities ${
            selectedYear ? `(From ${selectedYear})` : ""
          }`}
          data={chartData}
          dataKey="name"
          barKey="Facilities"
          tooltipLabel="Facilities: "
          barColor="#7C3AED"
          className="w-full"
          isFullDisplay={isFullDisplay}
        />
      ) : (
        <div className="text-center py-10 text-gray-500">
          No data available for {selectedYear || "the selected year"}.
        </div>
      )}
    </div>
  );
};

export default TrialsPerCityChart;
