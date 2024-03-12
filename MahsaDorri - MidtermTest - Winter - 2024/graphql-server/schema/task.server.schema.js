const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema, GraphQLFloat } = require('graphql');
const { createTask, updateTask, deleteTask, getTaskById, getTasks } = require('../resolvers/task.server.resolvers');
// Define types
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    taskId: { type: new GraphQLNonNull(GraphQLString) },
    taskName: { type: GraphQLString },
    address: { type: GraphQLString },
    startDate: { type: GraphQLString },
    type: { type: GraphQLString },
    bedrooms: { type: GraphQLInt },
    bathrooms: { type: GraphQLInt },
    rent: { type: GraphQLFloat }, // Assuming rent can be a decimal
    availableDate: { type: GraphQLString },
    leaseLength: { type: GraphQLInt },
  }),
});
// Define queries
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: getTasks,
    },
    
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: getTaskById,
    },
  },
});
// Define mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTask: {
      type: TaskType,
      args: {
        taskId: { type: GraphQLString },
        taskName: { type: GraphQLString },
        address: { type: GraphQLString },
        startDate: { type: GraphQLString },
        type: { type: GraphQLString },
        bedrooms: { type: GraphQLInt },
        bathrooms: { type: GraphQLInt },
        rent: { type: GraphQLFloat },
        availableDate: { type: GraphQLString },
        leaseLength: { type: GraphQLInt },
      },
      resolve: createTask,
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        taskId: { type: GraphQLString },
        taskName: { type: GraphQLString },
        address: { type: GraphQLString },
        startDate: { type: GraphQLString },
        type: { type: GraphQLString },
        bedrooms: { type: GraphQLInt },
        bathrooms: { type: GraphQLInt },
        rent: { type: GraphQLFloat },
        availableDate: { type: GraphQLString },
        leaseLength: { type: GraphQLInt },
      },
      resolve: updateTask,
    },
    deleteTask: {
      type: TaskType,
      args: {
        taskId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: deleteTask,
    },
    
  },
});
// Make queries and mutations available
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});
