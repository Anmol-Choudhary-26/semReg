const express = require('express')
const router = express.Router()

const TeacherController= require('../controllers/teacherController')

router.route('/').get(TeacherController.all).post(TeacherController.create)
router.route('/:id').get(TeacherController.find).patch(TeacherController.UpdateTeacher).delete(TeacherController.deleteTeacher)
router.route('/studentslist/:id').get(TeacherController.getAllStudent)
router.route('/alphasort/:id').get(TeacherController.sortStudent)
router.route('/filter/regcmplt/:id').get(TeacherController.filterStudent)
router.route('/filter/notregcmplt/:id').get(TeacherController.NonfilterStudent)

module.exports = router
