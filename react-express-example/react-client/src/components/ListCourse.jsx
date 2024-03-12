import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function ListCourse(props) {
  let navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const apiUrl = "/api/courses";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          if (result.data.screen !== 'auth') {
            console.log('data in if:', result.data )
            setCourses(result.data);
            setShowLoading(false);
          }
        })
        .catch(error => {
          console.log('error in fetchData:', error);
          setShowLoading(false);
        });
    };

    fetchData();
  }, []);

  const showCourseDetail = (id) => {
    navigate(`/list-course/${id}`);
  };

  return (
    <div>
      {courses.length !== 0 ? (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <ListGroup>
            {courses.map((course, idx) => ( // key={course._id}
              <ListGroup.Item key={idx} action onClick={() => showCourseDetail(course._id)}>
                {course.courseCode} - {course.courseName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default ListCourse;
