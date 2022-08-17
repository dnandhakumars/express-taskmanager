const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async")
const {createCustomError} = require("../utils/custom-error")

const getAllTasks = asyncWrapper(
  async (req, res) => {
    const tasks = await Task.find({}); // return all the data from db
    return res.status(200).json({ count:tasks.length, tasks});
})

const getTask = asyncWrapper( async (req, res, next) => {
    const {id:taskId} = req.params
    const task = await Task.findById({_id:taskId})
    console.log(task)
    if (!task){
      return next(createCustomError("Task not found", 404))
      // return res.status(404).json({message : "Task not found"})  
    }
    return res.status(200).json({task})
})

const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body);
    return res.status(201).json({ task });
})

const updateTask = asyncWrapper( async (req, res) => {
    const {id:taskId} = req.params
    const data = req.body
    const task = await Task.findOneAndUpdate({_id:taskId}, req.body, {
      new:true,
      runValidators:true
    })
    return res.status(200).json({task})
})

const deleteTask = asyncWrapper( async (req, res) => {
    const {id:taskId} = req.params
    const task = await Task.findOneAndDelete({_id:taskId});
    if (!task){
      return next(createCustomError("Task not found", 404))
    }
    return res.status(204).json({message:"Task delete successfully"})
})

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
