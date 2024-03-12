import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';


import Home from './components/Home';
import Login from './components/Login';

import ListCourse from './components/ListCourse';
import AddCourse from './components/AddCourse';
import ShowCourse from './components/ShowCourse';
import UpdateCourse from './components/UpdateCourse';

import AddStudent from './components/AddStudent';
import ListStudent from './components/ListStudent';
import UpdateStudent from './components/UpdateStudent';
import ShowStudent from './components/ShowStudent';
//import UpdateCourse from './components/UpdateCourse'



function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">Student and Course System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/add-student">Add Student</Nav.Link>
              <Nav.Link as={Link} to="/list-student">List of Students</Nav.Link>
              <Nav.Link as={Link} to="/add-course">Add Course</Nav.Link>
              <Nav.Link as={Link} to="/list-course">List of Courses</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element = {<Login />}/>
          <Route path="edit/:id" element={<UpdateStudent />} />
          <Route path="add-student" element = {<AddStudent />}/>
          <Route path="list-student" element = {<ListStudent />}/>          
          <Route path="list-student/:id" element = {<ShowStudent />}/>           
          <Route path="add-course" element={<AddCourse />} />          
          <Route path="list-course" element={<ListCourse />} />
          <Route path="list-course/:id" element = {<ShowCourse />}/>
          <Route path="edit-course/:id" element={<UpdateCourse />} />                
          
        </Routes>
      </div>
    </Router>
  );
}
//<Route path="list-student/:id" element={<ShowStudent />} /> 

export default App;
