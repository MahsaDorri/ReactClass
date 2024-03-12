import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import View from "./View";
import axios from "axios";

function App() {
  const [screen, setScreen] = useState("auth");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "/api/student-signin";
  

  const authenticateStudent = async () => {
    console.log("calling auth");
    console.log(username);
    try {
      const loginData = { auth: { username, password } };
      // Call the API for authentication
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data);
      //console.log(res.data.screen);

      if (res.data.screen !== undefined) {
        // Notify the parent component that the user has logged in.
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");
      const res = await axios.get("/api/read_cookie");

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      {screen === "auth" ? (
        <div>
          <Form>
            <Form.Group size="lg">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                placeholder="Enter your student ID"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              size="lg"
              variant="primary"
              type="Button"
              onClick={authenticateStudent}
            >
              Login
            </Button>
          </Form>
        </div>
      ) : (
        <View screen={screen} setScreen={setScreen} />
      )}
    </div>
  );
}

export default App;
