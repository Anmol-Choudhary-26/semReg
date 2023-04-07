const express = require('express')
const router = express.Router()

const TeacherController= require('../controllers/teacherController')

router.route('/').get(TeacherController.all).post(TeacherController.create)
router.route('/').get(TeacherController.find).patch(TeacherController.UpdateTeacher).delete(TeacherController.deleteTeacher)
router.route('/studentslist').get(TeacherController.getAllStudent)

module.exports = router
