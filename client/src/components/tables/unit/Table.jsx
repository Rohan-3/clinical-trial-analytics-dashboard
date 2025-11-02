const Table = ({
  data = [],
  columns = [],
  title = "Data Table",
  loading = false,
  error = null,
  pagination = null,
  className = "",
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-200 text-[#F5B301] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#F5B301] border-t-transparent rounded-full animate-spin"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[#FFF8E7] border border-red-400/30 rounded-xl text-red-500 shadow-sm">
        <p className="font-medium">Error: {error}</p>
        <p className="text-sm text-gray-500">Please try again later.</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-xl text-gray-500 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-[#F5B301] mb-2">{title}</h3>
        <p>No records found.</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden ${className}`}
    >
      {/* Title */}
      {title && (
        <h3 className="text-lg font-semibold text-[#1E1E1E] px-6 pt-5 pb-4 border-b border-gray-200 tracking-wide">
          {title}
        </h3>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FFF9E7] text-[#5F5F5F]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-200"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`transition-all ${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-[#FFFDF7]"
                } hover:bg-[#FFF5D1]/50`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-3 text-sm text-[#333] truncate max-w-[300px]"
                  >
                    {String(row[col.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
          <p>
            Page{" "}
            <span className="text-[#F5B301] font-medium">
              {pagination.page}
            </span>{" "}
            of{" "}
            <span className="text-[#F5B301] font-medium">
              {pagination.totalPages}
            </span>
          </p>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              className="px-3 py-1.5 rounded-md bg-[#FFF8E7] hover:bg-[#FFECA1]/70 border border-gray-200 text-[#333] disabled:opacity-40 font-medium transition"
            >
              Prev
            </button>
            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              className="px-3 py-1.5 rounded-md bg-[#FFF8E7] hover:bg-[#FFECA1]/70 border border-gray-200 text-[#333] disabled:opacity-40 font-medium transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
