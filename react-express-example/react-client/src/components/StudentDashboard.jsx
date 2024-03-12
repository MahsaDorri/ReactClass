import React from 'react';

function StudentDashboard({ setOperation, handleLogout }) {
  return (
    <div>
      <h1>Welcome to the Student Dashboard</h1>
      <button onClick={() => setOperation('list-my-course')}>List My Courses</button>
      <button onClick={handleLogout}>Log out</button>
      {/* Include additional student-specific components and functionality here */}
    </div>
  );
}

export default StudentDashboard;
