const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Schema Definition
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  studentNumber: { type: String, unique: true, required: true },
  password: String,
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  phoneNumber: String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  program: String,
  favoriteTopic: String,
  aspiringCareer: String,
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },
});

// Use a pre-save middleware to hash the password before saving it into the database
StudentSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    // Hash the password before saving it
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

StudentSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password);
};

StudentSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

const Student = mongoose.model('Student', StudentSchema);

(async () => {
  try {
    // Unique Student Number: 
    const existingAdmin = await Student.findOne({ studentNumber: 'admin' });
    
    if (!existingAdmin) {
      // If an admin with student number 'admin' doesn't exist, create it
      const admin = await Student.create({
        studentNumber: 'admin',
        password: 'password',
        role: 'admin',
        // Add other admin details here
      });
      console.log('Admin user created:', admin);
    } else {
      console.log('Admin user with student number "admin" already exists.');
    }
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
})();

