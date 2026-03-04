import React from "react";

function Stats({ stats }) {
  return (
    <div className="card">
      <h2>Assignment Stats</h2>

      <div className="stats-container">
        <div className="stat-box">
          <h3>Total</h3>
          <p>{stats.total || 0}</p>
        </div>

        <div className="stat-box">
          <h3>Submitted</h3>
          <p>{stats.submitted || 0}</p>
        </div>

        <div className="stat-box">
          <h3>Pending</h3>
          <p>{stats.pending || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;