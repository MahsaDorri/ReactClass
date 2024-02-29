const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'TaskSchema'
const TaskSchema = new Schema({
    taskId: { type: String, unique: true, required: true },
    taskName: String,
    address: String,
    startDate: String,
    type: String,
    bedrooms: Number,
    bathrooms: Number,
    rent: Number,
    availableDate: String,
    leaseLength: Number,
});
// Create the 'Task' model out of the 'TaskSchema'
const Task = mongoose.model('Task', TaskSchema);

// Export the 'Task' model
module.exports = Task;
