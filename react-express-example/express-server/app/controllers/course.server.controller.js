const mongoose = require("mongoose");
const Course = mongoose.model("Course");
const Student = require('mongoose').model('Student');
// applying crud operations on the course model
// Create a new course 
exports.createCourse = function (req, res, next) {
  const course = new Course(req.body);

  course
    .save()
    .then(() => {
      res.json(course);
    })
    .catch((err) => {
      return next(err);
    });
};

// Returns all courses
exports.listCourses = function (req, res, next) {
  Course.find({})
    .then((courses) => {
      res.json(courses);
    })
    .catch((err) => {
      return next(err);
    });
};

// 'read' controller method to display a course
exports.readCourse = function (req, res) {
  res.status(200).json(req.course);
};

// 'courseByID' controller method to find a course by its id
exports.courseByID = function (req, res, next, id) {
  Course.findOne({ _id: id })
    .then((course) => {
      req.course = course;
      next();
    })
    .catch((err) => {
      return next(err);
    });
};

// Update a course by id
exports.updateCourse = function (req, res, next) {
  Course.findByIdAndUpdate(req.course.id, req.body)
    .then((course) => {
      res.json(course);
    })
    .catch((err) => {
      return next(err);
    });
};

// Delete a course by id
exports.deleteCourse = function (req, res, next) {
  Course.findByIdAndRemove(req.course.id)
    .then((course) => {
      res.json(course);
    })
    .catch((err) => {
      return next(err);
    });
};

// method to enroll a student into a course
exports.addStudentToCourse = async (req, res) => {
  try {
      const courseId = req.params.courseId;
      const studentId = req.params.studentId;

      // Find the course by ID
      const course = await Course.findById(courseId).exec();

      if (!course) {
          return res.status(404).json({ error: 'Course not found' });
      }

      // Check if the student is already in the course's students array
      if (course.students.includes(studentId)) {
          return res.status(400).json({ error: 'Student is already in this course' });
      }

      // Add the student to the students array
      course.students.push(studentId);

      // Save the updated course
      const updatedCourse = await course.save();

      res.status(200).json(updatedCourse);
      } catch (error) {
      console.error('Error adding student to course:', error);
      res.status(500).json({ error: 'An error occurred while adding the student to the course.' });
  }   
}

// drop a student from a course
exports.removeStudentFromCourse = async (req, res) => {
  try {
      const courseId = req.params.courseId;
      const studentId = req.params.studentId;

      // Find the course by ID
      const course = await Course.findById(courseId).exec();

      if (!course) {
          return res.status(404).json({ error: 'Course not found' });
      }

      // Check if the student is in the course's students array
      const studentIndex = course.students.indexOf(studentId);
      if (studentIndex === -1) {
          return res.status(404).json({ error: 'Student not found in this course' });
      }

      // Remove the student from the students array
      course.students.splice(studentIndex, 1);

      // Save the updated course
      const updatedCourse = await course.save();

      res.status(200).json(updatedCourse);
      } catch (error) {
      console.error('Error removing student from course:', error);
      res.status(500).json({ error: 'An error occurred while removing the student from the course.' });
  } 
}

// A function designed to ensure that the operation being performed (e.g., dropping a course) is authorized. 
//However, the implementation seems incorrect as it checks if the student ID is included in the course's student list to determine authorization, 
//which is not a typical authorization check (it seems to be doing the opposite of what might be expected).
exports.hasAuthorization = function (req, res, next) {

  if (req.course.students.includes(req.id)) {
      return res.status(403).send({
          message: 'Student is not authorized'
      });
  }
  next();
};