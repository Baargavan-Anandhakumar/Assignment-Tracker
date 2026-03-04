import React, { useEffect, useState } from "react";
import "./App.css";
import AddAssignment from "./components/AddAssignment";
import AssignmentList from "./components/AssignmentList";
import Stats from "./components/Stats";
import Login from "./components/Login";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [assignments, setAssignments] = useState([]);
  const [stats, setStats] = useState({});

  const fetchData = async () => {
    if (!userId) return;

    try {
      const a = await fetch(
        `http://localhost:8080/assignments/user/${userId}`
      );
      const s = await fetch(
        `http://localhost:8080/assignments/stats/${userId}`
      );

      setAssignments(await a.json());
      setStats(await s.json());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const submit = async (id) => {
    await fetch(`http://localhost:8080/assignments/submit/${id}`, {
      method: "PUT",
    });
    fetchData();
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId(null);   // ✅ VERY IMPORTANT
  };

  // 🔹 If NOT logged in → show Login page
  if (!userId) {
    return <Login setUserId={setUserId} />;
  }

  // 🔹 If logged in → show Dashboard
  return (
    <div className="app-container">
      <h1>AssignTrack - Assignment Submission Tracker</h1>

      <button onClick={logout}>Logout</button>

      <AddAssignment refresh={fetchData} userId={userId} />

      <AssignmentList assignments={assignments} submit={submit} />

      <Stats stats={stats} />
    </div>
  );
}

export default App;