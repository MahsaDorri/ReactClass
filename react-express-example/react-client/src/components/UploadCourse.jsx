import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCourse(props) {
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  const [course, setCourse] = useState({
    _id: '',
    courseCode: '',
    courseName: '',
    section: '',
    semester: '',
  });

  const [showLoading, setShowLoading] = useState(true);
  const [updateError, setUpdateError] = useState(false);

  const apiUrl = `/api/courses/${id}`;  

  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);    
    };
    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {courseCode: course.courseCode, courseName: course.courseName, section: course.section, semester: course.semester }
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        navigate('/list-course/'+ result.data._id);
      }).catch(error => {
        console.log('error while updating:', error);
        setShowLoading(false);
      });
  };

  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      {updateError && <p>Error updating the course.</p>}

      <h2>Update Course</h2>
      <Form>
        <Form.Group>
          <Form.Label>Course Code:</Form.Label>
          <Form.Control type="text" name="courseCode" value={course.courseCode} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Course Name:</Form.Label>
          <Form.Control type="text" name="courseName" value={course.courseName} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Section:</Form.Label>
          <Form.Control type="text" name="section" value={course.section} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Semester:</Form.Label>
          <Form.Control type="text" name="semester" value={course.semester} onChange={onChange} />
        </Form.Group>
        <Button variant="primary" onClick={updateCourse}>
          Update
        </Button>
      </Form>
    </div>
  );
}

export default UpdateCourse;
