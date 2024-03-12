import React from 'react';

function AdminDashboard({ setOperation, handleLogout }) {
  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <button onClick={() => setOperation('add-course')}>Add Course</button>
      <button onClick={() => setOperation('add-student')}>Add Student</button>
      <button onClick={() => setOperation('list-course')}>List Courses</button>
      <button onClick={() => setOperation('list-student')}>List Students</button>
      <button onClick={() => setOperation('students-in-course')}>List Students in Course</button>
      <button onClick={handleLogout}>Log out</button>
      {/* Include additional admin-specific components and functionality here */}
    </div>
  );
}

export default AdminDashboard;
