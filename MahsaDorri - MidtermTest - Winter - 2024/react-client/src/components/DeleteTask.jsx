import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; // Ensure you import Spinner for the loading state

// Assuming your DELETE_TASK mutation and GET_TASK query are correctly defined

const DELETE_TASK = gql`
  mutation DeleteTask($taskId: String!) {
    deleteTask(taskId: $taskId) {
      id
    }
  }
`;

function DeleteTask() {
  const navigate = useNavigate();
  const { id } = useParams(); // `id` is the taskId from the URL
  const [deleteTask, { loading, error }] = useMutation(DELETE_TASK, {
    variables: { taskId: id },
    onCompleted: () => navigate('/tasklist'), // Navigate back after deletion
  });

  // Handling loading state
  if (loading) return <Spinner animation="border" />;
  // Handling error state
  if (error) return <p>Submission error! {error.message}</p>;

  // Function to call the delete mutation
  const handleDelete = () => {
    deleteTask().catch(err => {
      // Handle errors if not using the error state from useMutation
      console.error("Error deleting task:", err.message);
    });
  };

  return (
    <div className="entryform">
      <h2>Delete Task</h2>
      <p>Are you sure you want to delete this task?</p>
      <Button variant="danger" onClick={handleDelete}>Delete Task</Button>
      <Button variant="secondary" onClick={() => navigate('/tasklist')} style={{ marginLeft: '10px' }}>Cancel</Button>
    </div>
  );
}

export default DeleteTask;
