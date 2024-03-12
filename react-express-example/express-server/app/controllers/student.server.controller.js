const Student = require("mongoose").model("Student");
const Course = require("mongoose").model("Course");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

// error handling controller method
const getErrorMessage = function (err) {
  let message = "";

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "Student number already exists";
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

// function fetches and lists all courses associated with a specific student, identified by their student ID.
exports.listCoursesByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find the student by ID
    const student = await Student.findById(studentId).exec();

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Find all courses where this student's ID appears in the students array
    const courses = await Course.find({ students: studentId }).exec();

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error listing courses by student:', error);
    res.status(500).json({ error: 'An error occurred while listing courses.' });
  }
};

// Create a new user (student or admin)
exports.createUser = function (req, res, next) {
  const user = new Student(req.body); //

  user
    .save()
    .then(() => {
      res.json(user);
    })
    .catch((err) => {
      return next(err);
    });
};

// List all users (students and admins)
exports.listUsers = function (req, res, next) {
  Student.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      return next(err);
    });
};

// 'read' controller method to display a user (student or admin)
exports.readUser = function (req, res) {
  res.json(req.user);
};

// 'userId' controller method to find a user (student or admin) by its id
exports.userByID = function (req, res, next, id) {
  Student.findOne({ _id: id })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      return next(err);
    });
};

// Update a user (student or admin) by Id
exports.updateUser = function (req, res, next) {
  Student.findByIdAndUpdate(req.user.id, req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      return next(err);
    });
};

// Delete a user (student or admin) by Id
exports.deleteUser = function (req, res, next) {
  Student.findByIdAndRemove(req.user.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      return next(err);
    });
};

exports.authenticateUser = async function (req, res, next) {
  console.log(req.body);
  const username = req.body.auth.username;
  const password = req.body.auth.password;
  console.log(username);
  console.log(password);

  try {
    const user = await Student.findOne({ username: username }).exec();

    if (!user) {
      res.json({
        status: "error",
        message: "Student not found",
        data: null,
      });
      return;
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, username: user.studentNumber },
        jwtKey,
        { algorithm: "HS256", expiresIn: jwtExpirySeconds }
      );

      console.log("token:", token);
      res.cookie("token", token, {
        maxAge: jwtExpirySeconds * 1000,
        httpOnly: true,
      });
      res.status(200).send({ screen: user.studentNumber });
      req.user = user;
      next();
    } else {
      res.json({
        status: "error",
        message: "Invalid student number/password",
        data: null,
      });
    }
  } catch (err) {
    return next(err);
  }
};
//The code sets and verifies JWTs for handling user sessions, utilizing cookies for storing tokens.
// The JWTs are configured with an expiry time and are used to secure routes
//, requiring users to be authenticated to access certain parts of the application
exports.welcome = (req, res) => {
  // We can obtain the session token from the requests cookies,
  // which come with every request
  const token = req.cookies.token;
  console.log(token);
  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end();
  }
  var payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  // use back-quotes here
  res.send(`${payload.studentNumber}`);
};

// Sign out function
exports.signoutUser = (req, res) => {
  res.clearCookie("token");
  return res.status("200").json({ message: "Signed out" });
};

// check if the user is signed in
exports.isSignedInUser = (req, res) => {
  console.log("isSignedInUser route called");
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.json({ screen: "auth" }).end();
  }

  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(400).json({ message: "Bad request" });
  }

  res.status(200).json({ screen: payload.studentNumber });
};

// Requires login for protected routes
exports.requiresLogin = function (req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.send({ screen: "auth" }).end();
  }

  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
    console.log("in requiresLogin - payload:", payload);
    req.id = payload.id;
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(400).json({ message: "Bad request" });
  }
  next();
};
