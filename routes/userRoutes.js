const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/userControllers')

router.route('/').get(getAllTasks).post(createTask)
router.route('/ouser').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router
