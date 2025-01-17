import React from "react";

const TableSkeleton = () => {
  return (
    <>
      <div className="flex w-full gap-10">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </>
  );
};

export default TableSkeleton;