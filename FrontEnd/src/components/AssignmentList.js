import React, { useState } from "react";

function AssignmentList({ assignments, refresh }) {
  const [message, setMessage] = useState("");

  
  const deleteAssignment = async (id) => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this assignment?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/assignments/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("✅ Assignment deleted successfully!");
        refresh();
        setTimeout(() => setMessage(""), 3000);
      } else {
        alert("Failed to delete assignment");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const submitAssignment = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/assignments/submit/${id}`, {
        method: "PUT",
      }); 

      if (response.ok) {
        setMessage("✅ Assignment submitted successfully!");
        refresh();
        setTimeout(() => setMessage(""), 3000);
      } else {
        alert("Failed to submit assignment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <h2>Assignments</h2>

      {message && <div className="message">{message}</div>}

      <ul>
        {/* Header Row */}
        <li className="assignment-header">
          <span>Title</span>
          <span>Subject</span>
          <span>Due Date</span>
          <span>Status</span>
          <span>Action</span>
        </li>

        {/* Assignment Rows */}
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <span>{assignment.title}</span>
            <span>{assignment.subject}</span>
            <span>{assignment.dueDate}</span>

            <span
              className={`status ${
                assignment.status === "Pending" ? "pending" : "submitted"
              }`}
            >
              {assignment.status}
            </span>

            <span>
              {assignment.status === "Pending" && (
                <button onClick={() => submitAssignment(assignment.id)}>
                  Submit
                </button>
              )}

              <button
                style={{ backgroundColor: "#ef4444", marginLeft: "8px" }}
                onClick={() => deleteAssignment(assignment.id)}
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssignmentList;