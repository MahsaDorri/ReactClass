import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
//
import { gql, useQuery } from "@apollo/client";

// query to fetch tasks
const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
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

// React component listing tasks
function TaskList() {
  const { loading, error, data, refetch } = useQuery(GET_TASKS);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Property Id</th>
            <th>Title</th>
            <th>Address</th>
            <th>Start Date</th>
            <th>Type</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Rent</th>
            <th>Available Date</th>
            <th>Lease Length</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.taskId}</td>
              <td>{task.taskName}</td>
              <td>{task.address}</td>
              <td>{task.startDate}</td>
              <td>{task.type}</td>
              <td>{task.bedrooms}</td>
              <td>{task.bathrooms}</td>
              <td>{task.rent}</td>
              <td>{task.availableDate}</td>
              <td>{task.leaseLength}</td>
              <td>
                <Link to={`/edittask/${task.id}`}>Edit</Link> <span> | </span>
                <Link to={`/deletetask/${task.id}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="center">
        <button className="center" onClick={() => refetch()}>
          Refetch
        </button>
      </div>
    </div>
  );
}
//
export default TaskList;
