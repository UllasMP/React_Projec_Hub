import React from "react";

const Statistics = React.memo(({ stats }) => {
  return (
    <>
      <div className="stats" style={{ marginTop: 16 }}>
        <div>Total Patients: {stats.total}</div>
        <div>High Priority: {stats.highPriority}</div>
      </div>
    </>
  );
});

export default Statistics;
