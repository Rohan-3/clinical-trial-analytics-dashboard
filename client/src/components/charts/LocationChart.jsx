import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "@store/analyticsSlice";
import BarChart from "./unit/BarChart";

const LocationChart = ({isFullDisplay = false}) => {
  const dispatch = useDispatch();
  const { locations, status, error, selectedYear } = useSelector(
    (state) => state.analytics
  );

 // Fetching data whenever the year changes
  useEffect(() => {
    dispatch(fetchLocations({ startAfter: selectedYear }));
  }, [dispatch, selectedYear]);

  const chartData =
    locations?.map((item) => ({
      country: item.country,
      Facilities: item.count,
    })) || [];

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[280px] bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm sm:text-base font-medium text-gray-600">
          Loading trial location data...
        </p>
      </div>
    );
  }

  /* ------------------ Error State ------------------ */
  if (error && status === "failed") {
    return (
      <div className="p-4 text-center bg-[#FFF7F7] border border-red-300 rounded-xl shadow-sm">
        <p className="font-semibold text-red-600 text-sm sm:text-base">
          ⚠ Data Error
        </p>
        <p className="text-xs sm:text-sm text-gray-600">
          Failed to load location data.
        </p>
      </div>
    );
  }

  return (
    <div className=" bg-white rounded-xl shadow-md border border-gray-200 p-5 sm:p-6 hover:shadow-lg transition-all duration-300">
      {chartData.length > 0 ? (
        <BarChart
          title={`Clinical Trial Facilities per Country ${
            selectedYear ? `(From ${selectedYear})` : ""
          }`}
          data={chartData}
          dataKey="country"
          barKey="Facilities"
          barColor="#10B981"
          tooltipLabel="Facilities: "
          horizontal
          className="w-full"
          isFullDisplay={isFullDisplay}
        />
      ) : (
        <div className="text-center py-10 text-gray-500">
          No location data found for {selectedYear || "the selected year"}.
        </div>
      )}
    </div>
  );
};

export default LocationChart;
