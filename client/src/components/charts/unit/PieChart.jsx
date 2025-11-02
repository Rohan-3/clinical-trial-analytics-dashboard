import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#7C3AED", "#DB2777", "#F59E0B", "#10B981", "#22D3EE"];

const PieChartComponent = ({
  data,
  dataKey = "value",
  nameKey = "name",
  isFullDisplay = false,
}) => {
  const total = data.reduce((sum, item) => sum + item[dataKey], 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percent = ((item.value / total) * 100).toFixed(2);
      return (
        <div className="p-2 rounded-lg border border-[#F5B301] backdrop-blur-sm bg-amber-50 text-black shadow-xl">
          <p className="font-semibold ">{item.name}</p>
          <p className="text-sm ">Count: {item.value}</p>
          <p className="text-xs">per: {percent}%</p>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 font-medium">
        No demographic data available to display.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={isFullDisplay ? 500 : 300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={isFullDisplay ? 90 : 60}
          outerRadius={isFullDisplay ? 150 : 100}
          paddingAngle={3}
          dataKey={dataKey}
          nameKey={nameKey}
          labelLine={false}
          label={
            isFullDisplay
              ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`
              : ""
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={1}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          wrapperStyle={{ paddingTop: "10px", color: "#E9D5FF" }}
          formatter={(value) => {
            const item = data.find((d) => d[nameKey] === value);
            const percent = item
              ? ((item[dataKey] / total) * 100).toFixed(1)
              : 0;
            return `${value} (${percent}%)`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
