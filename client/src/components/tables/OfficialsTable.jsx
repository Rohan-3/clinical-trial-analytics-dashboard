import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfficialsData, setCurrentPage } from "@store/officialsSlice";
import Table from "../tables/unit/Table";

const OfficialsTable = () => {
  const dispatch = useDispatch();
  const { data, pagination, status, error } = useSelector(
    (state) => state.officials
  );

  useEffect(() => {
    dispatch(fetchOfficialsData());
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <div className="mt-10">
      <Table
        title="Trial Officials"
        data={data}
        loading={status === "loading"}
        error={error}
        columns={[
          { key: "name", label: "Name" },
          { key: "affiliation", label: "Affiliation" },
        ]}
        pagination={{
          page: pagination.page,
          totalPages: pagination.totalPages,
          onPageChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default OfficialsTable;
