import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PieChartComponent from "./unit/PieChart";
import { fetchDemographics } from "@store/analyticsSlice";

const DemographicsChart = ({ isFullDisplay = false }) => {
  const dispatch = useDispatch();
  const { demographics, status, error, selectedYear } = useSelector(
    (state) => state.analytics
  );

  // Fetching data whenever the year changes
  useEffect(() => {
    dispatch(fetchDemographics({ startAfter: selectedYear }));
  }, [dispatch, selectedYear]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[280px] bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm sm:text-base font-medium text-gray-600">
          Loading demographics data...
        </p>
      </div>
    );
  }

  if (error && status === "failed") {
    return (
      <div className="p-5 text-center bg-[#FFF7F7] border border-red-300 rounded-xl shadow-sm">
        <p className="font-semibold text-red-600 text-sm sm:text-base">
          ⚠ Data Error
        </p>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Failed to load demographic data.
        </p>
      </div>
    );
  }

  const sexDistribution = demographics?.sexDistribution || [];
  const chartData = sexDistribution
    .filter((item) => item.count > 0)
    .map((item) => ({
      name: item.sex === "UNKNOWN" ? "Unknown" : item.sex,
      value: item.count,
    }));

  return (
    <div
      className={`${
        isFullDisplay ? "mt-10" : ""
      } p-5 sm:p-6  bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full h-full flex flex-col justify-between`}
    >
      <div className="mb-4 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-[#1E1E1E] mb-1">
          Participant Demographics
        </h3>
        <p className="text-xs sm:text-sm text-gray-500">
          {selectedYear
            ? `Distribution of participants from year ${selectedYear}`
            : "Overall participant distribution by gender"}
        </p>
      </div>
      {chartData.length > 0 ? (
        <div className="flex-1 flex justify-center items-center">
          <PieChartComponent
            title="Participant Demographics"
            data={chartData}
            isFullDisplay={isFullDisplay}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-sm sm:text-base py-10">
          No demographic data found for {selectedYear || "the selected year"}.
        </div>
      )}
    </div>
  );
};

export default DemographicsChart;