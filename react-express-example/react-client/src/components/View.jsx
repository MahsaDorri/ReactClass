import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCourse from './AddCourse';
import ListCourse from './ListCourse';
import ListStudent from './ListStudent';
import AddStudent from './AddStudent';
import ListStudentsInCourse from './ListStudentsInCourse';

function View(props) {
  const { screen, setScreen } = props;
  const [data, setData] = useState();
  const [operation, setOperation] = useState('dashboard');
  const apiUrl = "/api/welcome";

  const handleLogout = async () => {
    try {
      await axios.get("/api/signout");
      setScreen('auth');
    } catch (error) {
      console.log(error);
    }
  };

  const verifyCookie = async () => {
    try {
      const res = await axios.get(apiUrl);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    verifyCookie();
  }, []);

  const renderStudentDashboard = () => (
    <div>
      <p>{screen}</p>
      <button onClick={() => setOperation('list-course')}>List My Courses</button>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );

  const renderAdminDashboard = () => (
    <div>
      <p>{screen}</p>
      <button onClick={() => setOperation('add-course')}>Add Course</button>
      <button onClick={() => setOperation('add-student')}>Add Student</button>
      <button onClick={() => setOperation('list-course')}>List Courses</button>
      <button onClick={() => setOperation('list-student')}>List Students</button>
      <button onClick={() => setOperation('students-in-course')}>List Students in Course</button>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );

  const renderDefaultDashboard = () => (
    <div>
      <p>{screen}</p>
      <p>{data}</p>
      <button onClick={() => setOperation('add-course')}>Add Course</button>
      <button onClick={() => setOperation('list-course')}>List Courses</button>
      <button onClick={() => setOperation('add-student')}>Add Student</button>
      <button onClick={() => setOperation('list-student')}>List Students</button>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );

  return (
    <div className="App">
      {(() => {
        switch (operation) {          
          case "add-course":
            return <AddCourse />;
          case "add-student":
            return <AddStudent />;
          case "list-course":
            return <ListCourse />;
          case "list-student":
            return <ListStudent />;
          case "students-in-course":
            return <ListStudentsInCourse />;
          default:
            return (
              <>
                {screen === 'admin' ? renderAdminDashboard() : null}
                {screen === 'student' ? renderStudentDashboard() : null}
                {screen === 'dashboard' ? renderDefaultDashboard() : null}
              </>
            );
        }
      })()}
    </div>
  );
}

export default View;
