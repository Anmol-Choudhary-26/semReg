const user = require('../models/userModel');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  const User = await user.find({})
  res.status(200).json({ User })
})

const createTask = asyncWrapper(async (req, res) => {
  const User = await user.create(req.body)
  res.status(201).json({ User })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const User = await user.findOne({_id : req.body.id})
  if (!User) {
    return next(createCustomError(`No task with id : ${req.body.id}`, 404))
  }

  res.status(200).json({ User })
})
const deleteTask = asyncWrapper(async (req, res, next) => {
  const User = await user.findOneAndDelete({ _id: req.body.id })
  if (!User) {
    return next(createCustomError(`No task with id : ${req.body.id}`, 404))
  }
  res.status(200).json({ User })
})
const updateTask = asyncWrapper(async (req, res, next) => {
  const User = await user.findOneAndUpdate({_id: req.body.id}, req.body, {
    new: true,
    runValidators: true,
  })

  if (!User) {
    return next(createCustomError(`No task with id : ${req.body.id}`, 404))
  }

  res.status(200).json({ User })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
