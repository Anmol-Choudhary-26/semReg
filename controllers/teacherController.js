const { createCustomError } = require('../errors/custom-error');
const TeacherModel = require('../models/teacherModel')
const StudentModel = require('../models/userModel')
let TeacherController = {
    find: async (req, res) =>{
        let found = await TeacherController.find({name: req.params.id})
        res.json(found);
    },
    all: async (req, res) => {
        let all = await TeacherModel.find()
        res.json(all);
    },
    create: async (req, res) => {   
        let newTeacher = await TeacherModel(req.body)
        let savedUser = await newTeacher.save()
        res.json(savedUser)
    },
    getAllStudent: async (req, res) =>{
            try{

                let allStudent = await StudentModel.find({Teacher: req.body.id}).sort({roll_no: -1})
                res.json(allStudent)
            }
            catch(err){
                console.log(err)
            }
    },
    deleteTeacher: async (req, res) =>{
        try{
            let deletedTeacher = await TeacherModel.findByIdAndDelete({_id:req.body.id})
            if (!deletedTeacher) {
                return next(createCustomError(`No Teacher with id : ${req.body.id}`, 404))
              }
            res.json("Teacher deleted successfully")
        }
        catch(err){
            console.log(err)
        }
    },
    UpdateTeacher: async (req, res) =>{
        try{
            let UpdateTeacher = await TeacherModel.findByIdAndUpdate(req.body.id)
            if (!UpdateTeacher) {
                return next(createCustomError(`No Teacher with id: ${req.body.id}`, 404))
    }
    res.json("Teacher Updated ")
}
    catch(err){
        console.log(err)
    }

},
 
  sortStudent: async (req, res) =>{
    try {
        let allStudent = await StudentModel.find({Teacher: req.body.id, registrationCompleted : true})
        .sort({name: -1})
      res.status(200).json(allStudent);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  filterStudent: async (req, res) =>{
    try {
        let allStudent = await StudentModel.find({Teacher: req.body.id, registrationCompleted : true})
        .sort({name: -1})
      res.status(200).json(allStudent);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  NonfilterStudent: async (req, res) =>{
    try {
        let allStudent = await StudentModel.find({Teacher: req.body.id, registrationCompleted : false})
        .sort({name: -1})
      res.status(200).json(allStudent);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

module.exports = TeacherController