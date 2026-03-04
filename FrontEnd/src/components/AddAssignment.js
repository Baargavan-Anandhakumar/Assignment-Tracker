import React, { useState } from "react";

function AddAssignment({ refresh, userId }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addAssignment = async (e) => {
    e.preventDefault(); 

    if (!title || !subject || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/assignments/add/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            subject,
            dueDate,
            status: "Pending",
          }),
        }
      );

      if (response.ok) {
        setTitle("");
        setSubject("");
        setDueDate("");
        refresh();
      } else {
        console.log("Failed to add assignment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <h2>Add Assignment</h2>

      <form onSubmit={addAssignment}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit">Add Assignment</button>
      </form>
    </div>
  );
}

export default AddAssignment;