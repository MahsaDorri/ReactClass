//Load the student controller
const courseController = require("../controllers/course.server.controller");
const studentController = require("../controllers/student.server.controller");

//Define the routes module method
//Course Operations (/courses):

//The .route("/courses") method chains HTTP GET and POST requests to list all courses and create a new course,
// respectively. This is a common RESTful approach to use the same endpoint (/courses) for listing resources
// (GET) and creating a new resource (POST).
//The repeated app.get("/courses", courseController.listCourses); seems redundant because 
//it's already defined in the chained route setup and can be removed to avoid confusion.
module.exports = function (app) {
  app
    .route("/courses")
    .get(courseController.listCourses)
    .post(courseController.createCourse);

  //list all courses
  app.get("/courses", courseController.listCourses);
//This route setup allows for adding a student to a course (POST) and removing
// a student from a course (DELETE), identified by :courseID and :studentId. 
//This setup illustrates a RESTful way to manage relationships between resources
// (courses and students in this case).
  app.route("/courses/:courseID/students/:studentId")
    .delete(courseController.removeStudentFromCourse)
    .post(courseController.addStudentToCourse);

  //Similar to the first point but specific to a single course identified by :courseId.
  // It chains HTTP GET, PUT, and DELETE requests to read, update, and delete a course, respectively. 
  //This pattern is typical in RESTful APIs for resource-specific operations.
  app
    .route("/courses/:courseId")
    .get(courseController.readCourse)
    .put(courseController.updateCourse)
    .delete(courseController.deleteCourse);

  //Set up the 'courseId' parameter middleware
  app.param("courseId", courseController.courseByID);
  app.param("studentId", studentController.userByID)
};
