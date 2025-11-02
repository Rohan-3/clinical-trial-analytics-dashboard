import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedYear as setSelectedYearAction } from "@store/analyticsSlice";
import profile from "@assets/profile.svg";
import filter from "@assets/filter.svg";
import down from "@assets/down.svg";

const Header = () => {
  const dispatch = useDispatch();
  const [localYear, setLocalYear] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const startYear = 2010;
  const endYear = new Date().getFullYear();

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleSelectYear = (year) => {
    setLocalYear(year);
    setIsDropdownOpen(false);
    dispatch(setSelectedYearAction(year));
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-4 sm:px-8 lg:ml-64">
        <h1 className="text-lg sm:text-xl font-semibold tracking-wide text-[#222]">
          Clinical Trial Analytics
        </h1>

        <div className="flex items-center space-x-4 relative">
          <div className="relative">
            {/* Filter Dropdown */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FFF8E7] text-[#333] hover:bg-[#FFECA1]/80 transition-all text-sm font-medium shadow-sm border border-[#EADCA7]"
            >
              <img src={filter} alt="filter" className="h-3 w-3 opacity-80" />

              {localYear ? `From Year: ${localYear}` : "Filter by year"}

              <img
                src={down}
                alt="dropdown arrow"
                className="h-5 w-5 opacity-80"
              />
            </button>

            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md max-h-64 overflow-y-auto">
                {years.map((year) => (
                  <li
                    key={year}
                    onClick={() => handleSelectYear(year)}
                    className={`px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-[#FFF3C4]/80 transition ${
                      year === localYear ? "bg-[#FFECA1] font-semibold" : ""
                    }`}
                  >
                    {year}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FFECA1] text-[#5F5F5F] hover:scale-105 shadow-sm cursor-pointer transition">
            <img src={profile} alt="profile" className="h-5 w-5 opacity-80" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
