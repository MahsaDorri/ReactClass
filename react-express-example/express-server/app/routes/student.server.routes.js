const studentController = require("../../app/controllers/student.server.controller");

module.exports = function (app) {
  // Create a new user (student or admin)
    //These routes are designed to create new users, which can be either students or admins. The difference in endpoints (/ and /students/create) allows for flexibility in how the API can be consumed,
  // although typically, you would use a more specific endpoint like 
  app.post("/", studentController.createUser);



  //Retrieves a list of all users in the database. This endpoint is useful for admin purposes,
  // such as displaying all registered users on a dashboard.
  app.get("/students", studentController.listUsers);


  app.post("/students/create", studentController.createUser)
  //This endpoint allows for listing all courses associated with a specific student, identified by studentId. 
  //This is particularly useful for creating a personalized dashboard for students to see their courses.
  app.get("/students/:studentId/courses", studentController.listCoursesByStudent)

  // A parameterized route setup for actions related to a specific user,
  // allowing for reading (GET), updating (PUT), and deleting (DELETE) a user's data. 
  //The studentId in the URL is used to identify the specific user.
  app
    .route("/students/:studentId")
    .get(studentController.readUser)
    .put(studentController.updateUser)
    .delete(studentController.deleteUser);

  // Set up the 'userId' parameter middleware
  app.param("studentId", studentController.userByID);

  // Add authentication route for student and admin login
  app.post("/student-signin", studentController.authenticateUser);
  // Add signout route
  app.get("/signout", studentController.signoutUser);

  // Check if the user (student or admin) is signed in
  //A route to check if the user is currently signed in, 
  //probably by verifying the presence and validity of an authentication cookie or token.
  app.get("/read_cookie", studentController.isSignedInUser);
 
  //path to protected page
  app.get("/welcome", studentController.welcome);

  // Additional routes for admin-specific actions
  //app.post("/admins", studentController.createAdmin);
 // app.get("/admins", studentController.listAdmins);

  // Add more admin-specific routes as needed

  // Authentication and sign-out routes can remain unchanged
};
