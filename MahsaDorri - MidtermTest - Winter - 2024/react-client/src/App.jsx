import './App.css';

//
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//  npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
//
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import DeleteTask from './components/DeleteTask';

import Home from './components/Home';

//
function App() {

  return (
    <Router>
      
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">React Client For GraphQL API</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home" >Home</Nav.Link>
              <Nav.Link as={Link} to="/createtask">Create Task</Nav.Link>
              <Nav.Link as={Link} to="/tasklist">Task List</Nav.Link>
              

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path = "home" element={<Home />} /> 
          <Route path = "tasklist" element={<TaskList />} />
          <Route path = "createtask" element={<CreateTask />} /> 
          <Route path = "edittask/:id" element={<EditTask />} /> 
          <Route path = "deletetask/:id" element={<DeleteTask />} />       

        </Routes>
    </div>    
      

    </Router>

  );
}
//
export default App;
