const Task = require('../models/task.server.model');
// 
const getTasks = async () => {
  return await Task.find();
};
//
const getTaskById = async (parent, args) => {
  return await Task.findById(args.id);
};
//
const createTask = async (parent, args) => {
  const task = new Task(args);
  return await task.save();
};
//
const updateTask = async (parent, args) => {
  console.log('args in update task :', args)
  const { id, ...update } = args;
  const options = { new: true };
  return await Task.findByIdAndUpdate(id, update, options);
};
//
const deleteTask = async (parent, args) => {
  //return await Task.findByIdAndDelete(args.id);
  console.log('args in delete task :', args)
  try {
    const deletedItem = await Task.findOneAndRemove({ taskId: args.taskId }).exec();

    if (!deletedItem) {
      console.log(`TaskID ${args.taskId} not found`);
      throw new Error(`TaskID ${args.taskId} not found`);
    }else{
      console.log('deletedItem:', deletedItem);
    }

    return deletedItem;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task.');
  }
};

// Make resolvers available to other modules
module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
