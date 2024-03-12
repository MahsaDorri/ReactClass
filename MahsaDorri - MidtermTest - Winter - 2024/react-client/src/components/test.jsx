import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const GET_TASK = gql`
  query GetTask($id: String!) {
    task(id: $id) {
        taskId
        taskTitle
        taskDescription
        startDate
        genre
        rating
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(taskId: $id) {
      id
    }
  }
`;

function DeleteTask(props) {
  let navigate = useNavigate();
  let taskId;
  const { id } = useParams(); // Get the id parameter from the URL

  const { data } = useQuery(GET_TASK, {
    variables: { id },
    onCompleted: (data) => {
      const { taskId: currentTaskId } = data.task;
      taskId.value = currentTaskId;
    },
  });

  const [deleteTask, { loading, error }] = useMutation(DELETE_TASK);

  if (loading) return <Spinner animation="border" />;
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="entryform">
      <h2>Delete Operation</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteTask({ variables: { id: taskId.value } });
          taskId.value = '';
          navigate('/tasklist');
        }}
      >
        <Form.Group>
          <Form.Label>ID Task:</Form.Label>
          <Form.Control
            type="text"
            name="taskId"
            ref={(node) => {
              taskId = node;
            }}
            placeholder="Task Id"
          />
        </Form.Group>
        <br/>
        <Button variant="primary" type="submit">
          Delete Task
        </Button>
      </form>
    </div>  
  );
}

export default DeleteTask;
