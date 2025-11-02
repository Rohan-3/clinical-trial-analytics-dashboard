import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChart = ({
  data,
  dataKey,
  barKey,
  title = "Bar Chart",
  barColor = "#F5B301",
  tooltipLabel = "",
  horizontal = false,
  className = "",
  isFullDisplay,
}) => {
  if (!data || !data.length || !dataKey || !barKey) {
    return (
      <div
        className={`flex items-center justify-center p-6 rounded-xl bg-[#FFFDF7] border border-gray-200 text-[#F5B301] shadow-sm ${className}`}
      >
        <p>No data available for {title}.</p>
      </div>
    );
  }

  return (
    <div
      className={` mt-4 rounded-xl bg-white b transition-all duration-300 w-full h-full ${className}`}
    >
      {title && (
        <h3 className="text-center text-lg sm:text-xl font-semibold text-[#1E1E1E] mb-3">
          {title}
        </h3>
      )}

      <ResponsiveContainer
        width="90%"
        aspect={isFullDisplay ? (horizontal ? 1.8 : 1.8) : horizontal ? 1 : 1}
      >
        <RechartsBarChart
          data={data}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#  " opacity={0.6} />

          {horizontal ? (
            <>
              <XAxis
                type="number"
                stroke="#B0B0B0"
                tick={{ fill: "#777", fontSize: 10 }}
              />
              <YAxis
                type="category"
                dataKey={dataKey}
                stroke="#B0B0B0"
                tick={{ fill: "#777", fontSize: 10 }}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={dataKey}
                stroke="#B0B0B0"
                tick={{ fill: "#777", fontSize: 12 }}
              />
              <YAxis stroke="#B0B0B0" tick={{ fill: "#777", fontSize: 12 }} />
            </>
          )}

          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFDF7",
              border: "1px solid #F5B30140",
              borderRadius: "10px",
              color: "#444",
              fontSize: "13px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
            formatter={(value) => [`${tooltipLabel}${value}`, barKey]}
          />

          <Legend
            wrapperStyle={{
              color: "#777",
              fontSize: "12px",
              marginTop: "10px",
            }}
            iconType="circle"
          />

          <Bar
            dataKey={barKey}
            fill={barColor}
            radius={[8, 8, 0, 0]}
            barSize={18}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
