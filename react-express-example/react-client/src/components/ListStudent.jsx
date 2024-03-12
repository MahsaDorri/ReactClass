import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';

function ListStudent(props) {
  let navigate = useNavigate();
  let { id } = useParams();

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "api/students/";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          if (result.data.screen !== 'auth') {
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          setListError(true);
        });
    };
    fetchData();
  }, []);

  const showDetail = (id) => {
    navigate('/list-student/' + id);
  }

  const updateStudent = (id) => {
    navigate('/edit/' + id);
  }

  const deleteStudent = (id) => {
    setShowLoading(true);
    axios.delete(apiUrl + id)
      .then((result) => {
        setShowLoading(false);
        // After successful deletion, you can update the student list or perform any other actions as needed.
      }).catch((error) => setShowLoading(false));
  }

  return (
    <div>
      {data.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>}
          <ListGroup>
          {data.map((item, idx) => ( // key={course._id}
              <ListGroup.Item key={idx} action onClick={() => showDetail(item._id)}>
                {item.lastName}, {item.firstName} ({item.studentNumber})
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        : <div>No students found</div>
      }
    </div>
  );
}

export default ListStudent;
