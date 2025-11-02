import overview from "@assets/overview.svg";
import demographics from "@assets/demographics.svg";
import cityBlock from "@assets/city-block.svg";
import location from "@assets/location.svg";

// sidebar config
const sidebarConfig = [
  { label: "Overview", id: "overview", icon: overview },
  { label: "Demographics", id: "demographics", icon: demographics },
  { label: "Trials Per City", id: "trials", icon: cityBlock },
  { label: "Trial Locations", id: "locations", icon: location },
];

export default function Sidebar({
  activeView,
  setActiveView,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 z-30 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 w-64 h-screen 
          bg-white text-[#444] flex flex-col border-r border-gray-200 shadow-[2px_0_8px_rgba(0,0,0,0.05)]
          z-40 transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-100">
          <span className="text-2xl font-bold text-[#F5B301] tracking-wide">
            SIRO
          </span>
        </div>

        <nav className="flex-1 mt-4 overflow-y-auto">
          {sidebarConfig.map(({ label, id, icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`flex items-center gap-3 w-full px-6 py-3 text-sm font-medium text-left rounded-r-full transition-all duration-200
                ${
                  activeView === id
                    ? "bg-[#FFF3C4] text-[#1E1E1E] font-semibold"
                    : "text-[#5F5F5F] hover:bg-[#FFF9E7]"
                }`}
            >
              <img src={icon} alt={label} className="h-5 w-5 opacity-80" />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-gray-200 text-xs text-gray-500 text-center">
          © 2025 SIRO Analytics
        </div>
      </aside>
    </>
  );
}
