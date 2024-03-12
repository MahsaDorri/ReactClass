import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';


function ShowCourse(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  //
  console.log(id);
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/courses/" + id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {            
      const result = await axios(apiUrl);
      console.log('Results from courses:', result.data);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = (id) => {
    navigate(`/edit-course/${id}`);
  };

  const deleteCourse = (id) => {
    setShowLoading(true);
    const data = { courseCode: data.courseCode, courseName: data.courseName, section: data.section, semester: data.semester};
    //
    axios.delete(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/list-course');
      })
      .catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      <h1>Code: {data.courseCode}</h1>
      <p>Description: {data.courseName}</p>

      <p>
        <Button type="button" variant="primary" onClick={() => { editCourse(data._id) }}>Edit</Button>&nbsp;
        <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Delete</Button>
      </p>
    </div>
  );
}

export default ShowCourse;
