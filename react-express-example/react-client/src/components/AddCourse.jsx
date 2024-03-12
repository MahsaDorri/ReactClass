import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function AddCourse() {
  let navigate = useNavigate();
  const [course, setCourse] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: '',
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = '/api/courses';

  const saveCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      section: course.section,
      semester: course.semester,
    };

    axios
      .post(apiUrl, data)
      .then(() => {
        setShowLoading(false);
        navigate('/list-course');
      })
      .catch(() => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-course">
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Form onSubmit={saveCourse}>
        <Form.Group>
          <Form.Label>Course Code:</Form.Label>
          <Form.Control
            type="text"
            name="courseCode"
            placeholder="Enter course code"
            value={course.courseCode}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Course Name:</Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            placeholder="Enter course name"
            value={course.courseName}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Section:</Form.Label>
          <Form.Control
            type="text"
            name="section"
            placeholder="Enter section"
            value={course.section}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Semester:</Form.Label>
          <Form.Control
            type="text"
            name="semester"
            placeholder="Enter semester"
            value={course.semester}
            onChange={onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Course
        </Button>
      </Form>
    </div>
  );
}

export default AddCourse;
