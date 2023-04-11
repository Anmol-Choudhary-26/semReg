const express = require('express')
const router = express.Router()

const TeacherController= require('../controllers/teacherController')

router.route('/').get(TeacherController.all).post(TeacherController.create)
router.route('/').get(TeacherController.find).patch(TeacherController.UpdateTeacher).delete(TeacherController.deleteTeacher)
router.route('/studentslist').get(TeacherController.getAllStudent)
router.route('/alphasort').get(TeacherController.sortStudent)
router.route('/filter/regcmplt').get(TeacherController.filterStudent)
router.route('/filter/notregcmplt').get(TeacherController.NonfilterStudent)

module.exports = router
