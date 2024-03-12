import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function AddStudent(props) {
  let navigate = useNavigate();
  const [student, setStudent] = useState({
    studentNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    program: '',
    favoriteTopic: '',
    aspiringCareer: '',
  });
  
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "api/"; 

  const saveStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      studentNumber: student.studentNumber,
      password: student.password,
      firstName: student.firstName,
      lastName: student.lastName,
      addrress: student.address,
      city: student.city,
      phoneNumber: student.phoneNumber,
      email: student.email,
      program: student.program,
      favoriteTopic: student.favoriteTopic,
      aspiringCareer: student.aspiringCareer,      
    };

    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/list-students/' + result.data._id) // Redirect to the list of students
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <h1>Add Student</h1>
      <Form onSubmit={saveStudent}>
        <Form.Group>
          <Form.Label>Student Number:</Form.Label>
          <Form.Control type="text" name="studentNumber" placeholder="Enter student number" value={student.studentNumber} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter password" value={student.password} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" name="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" name="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" name="address" placeholder="Enter address" value={student.address} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>City:</Form.Label>
          <Form.Control type="text" name="city" placeholder="Enter city" value={student.city} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control type="text" name="phoneNumber" placeholder="Enter phone number" value={student.phoneNumber} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={student.email} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Program:</Form.Label>
          <Form.Control type="text" name="program" placeholder="Enter program" value={student.program} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Favorite Topic:</Form.Label>
          <Form.Control type="text" name="favoriteTopic" placeholder="Enter favorite topic" value={student.favoriteTopic} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Aspiring Career:</Form.Label>
          <Form.Control type="text" name="aspiringCareer" placeholder="Enter aspiring career" value={student.aspiringCareer} onChange={onChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Student
        </Button>
      </Form>
    </div>
  );
}

export default AddStudent;
