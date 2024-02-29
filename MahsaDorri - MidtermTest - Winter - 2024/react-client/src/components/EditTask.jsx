import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const GET_TASK = gql`
  query GetTask($id: String!) {
    task(id: $id) {
      taskId
      taskName
      address
      startDate
      type
      bedrooms
      bathrooms
      rent
      availableDate
      leaseLength
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: String!, $taskId: String!, $taskName: String, $address: String, $startDate: String,
    $type: String, $bedrooms: Int, $bathrooms: Int, $rent: Float, $availableDate: String, $leaseLength: Int) {
    updateTask(id: $id, taskId: $taskId, taskName: $taskName, address: $address, startDate: $startDate, 
    type: $type, bedrooms: $bedrooms, bathrooms: $bathrooms, rent: $rent, availableDate: $availableDate, leaseLength: $leaseLength) {
      id
      taskId
      taskName
          }
  }
`;
//

function EditTask(props) {
  let navigate = useNavigate();
  const { id } = useParams(); // Get the id parameter from the URL

  const { loading, error, data } = useQuery(GET_TASK, {
    variables: { id },
    onCompleted: (data) => {
      const { taskId: currentTaskId, taskName: currentTaskName,
        address: currentAddress, startDate: currentStartDate, type: currentType,
        bedrooms: currentBedrooms, bathrooms: currentBathrooms, rent: currentRent,
        availableDate: currentAvailableDate, leaseLength: currentLeaseLength } = data.task;
      setTask({ id, taskId: currentTaskId, taskName: currentTaskName, address: currentAddress, 
        startDate: currentStartDate, type: currentType, bedrooms: currentBedrooms,
         bathrooms: currentBathrooms, rent: currentRent, availableDate: currentAvailableDate,
          leaseLength: currentLeaseLength });

      
    },
  });

  const [updateTask] = useMutation(UPDATE_TASK);

  const [task, setTask] = useState({
    id: '',
    taskId: '',
    taskName: '', 
  address: '',
    startDate: '',
    type: '',
    bedrooms: 0,
    bathrooms: 0,
    rent: 0.0,
    availableDate: '',
    leaseLength: 0,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTask({ variables: { ...task, id: task.id, bedrooms: parseInt(task.bedrooms), bathrooms: parseInt(task.bathrooms), rent: parseFloat(task.rent), leaseLength: parseInt(task.leaseLength) } });
    navigate('/tasklist');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Task Id</Form.Label>
          <Form.Control
            type="text"
            name="taskId"
            placeholder="Enter task Id"
            value={task.taskId || data.task.taskId}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            name="taskName"
            placeholder="Enter task name"
            value={task.taskName || data.task.taskName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter address"
            value={task.address || data.task.address}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="text"
            name="startDate"
            placeholder="Enter start date"
            value={task.startDate || data.task.startDate}
            onChange={handleInputChange}
          />

        </Form.Group>
        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            placeholder="Enter type"
            value={task.type || data.task.type}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBedrooms">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Control
            type="text"
            name="bedrooms"
            placeholder="Enter bedrooms"
            value={task.bedrooms || data.task.bedrooms}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBathrooms">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Control
            type="text"
            name="bathrooms"
            placeholder="Enter bathrooms"
            value={task.bathrooms || data.task.bathrooms}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formRent">
          <Form.Label>Rent</Form.Label>
          <Form.Control
            type="text"
            name="rent"
            placeholder="Enter rent"
            value={task.rent || data.task.rent}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formAvailableDate">
          <Form.Label>Available Date</Form.Label>
          <Form.Control
            type="text"
            name="availableDate"
            placeholder="Enter available date"
            value={task.availableDate || data.task.availableDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formLeaseLength">
          <Form.Label>Lease Length</Form.Label>
          <Form.Control
            type="text"
            name="leaseLength"
            placeholder="Enter lease length"
            value={task.leaseLength || data.task.leaseLength}
            onChange={handleInputChange}
          />
        </Form.Group>
        

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
//
export default EditTask;
