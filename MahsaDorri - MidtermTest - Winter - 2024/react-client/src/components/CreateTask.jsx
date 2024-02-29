import React from 'react';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'; // Import react-bootstrap components



const ADD_TASK = gql`
    mutation AddTask($taskId: String!, $taskName: String, $address: String, $startDate: String,
                $type: String, $bedrooms: Int, $bathrooms: Int, $rent: Float,
                $availableDate: String, $leaseLength: Int) {
        createTask(taskId: $taskId, taskName: $taskName, address: $address, startDate: $startDate,
                type: $type, bedrooms: $bedrooms, bathrooms: $bathrooms, rent: $rent,
                availableDate: $availableDate, leaseLength: $leaseLength) {
            id
            taskId
            taskName
        }
    }
`;

function CreateTask() {
    let navigate = useNavigate();
    const [addTask] = useMutation(ADD_TASK);
    const [taskId, setTaskId] = React.useState('');
    const [taskName, setTaskName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [type, setType] = React.useState('');
    const [bedrooms, setBedrooms] = React.useState('');
    const [bathrooms, setBathrooms] = React.useState('');
    const [rent, setRent] = React.useState('');
    const [availableDate, setAvailableDate] = React.useState('');
    const [leaseLength, setLeaseLength] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert string values to numbers where necessary
        const variables = {
            taskId,
            taskName,
            address,
            startDate,
            type,
            bedrooms: parseInt(bedrooms, 10),
            bathrooms: parseInt(bathrooms, 10),
            rent: parseFloat(rent),
            availableDate,
            leaseLength: parseInt(leaseLength, 10),
        };

        addTask({ variables })
            .then(() => {
                // Reset form fields and navigate on success
                setTaskId('');
                setTaskName('');
                setAddress('');
                setStartDate('');
                setType('');
                setBedrooms('');
                setBathrooms('');
                setRent('');
                setAvailableDate('');
                setLeaseLength('');
                navigate('/tasklist');
            })
            .catch((error) => {
                // Handle errors, e.g., show an error message
                console.error("Error creating task:", error.message);
            });
    };
    return (
        <Container>
            <h2>Please Add Information Of Your Property</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Property Id</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Task Id"
                            value={taskId}
                            onChange={(e) => setTaskId(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Title</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Task Name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Address</Form.Label>
                    <Col sm={10}>
                        <Form.Control

                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Col>
                </Form.Group>
            
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Type</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Bedrooms</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text" 
                            placeholder="Bedrooms"
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Bathrooms</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Bathrooms"
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Rent</Form.Label>
                    <Col sm={10}>   
                        <Form.Control
                            type="text"
                            placeholder="Rent"
                            value={rent}
                            onChange={(e) => setRent(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Available Date</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Available Date"
                            value={availableDate}
                            onChange={(e) => setAvailableDate(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Lease Length</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"

                            placeholder="Lease Length"  
                            value={leaseLength}
                            onChange={(e) => setLeaseLength(e.target.value)}
                        />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Start Date</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Col>
                </Form.Group>                    
                <Button variant="primary" type="submit">Add Task</Button>
            </Form>
        </Container>
    );
}

export default CreateTask;
