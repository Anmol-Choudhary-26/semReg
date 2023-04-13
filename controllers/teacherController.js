const { createCustomError } = require('../errors/custom-error');
const TeacherModel = require('../models/teacherModel')
const StudentModel = require('../models/userModel')
let TeacherController = {
    find: async (req, res) =>{
        let found = await TeacherModel.find({fbid: req.params.id}).populate("students")
        // console.log( typeof found)
        if(found.length != 0){
          res.json(found);
        }
        else{
          res.status(400).json({msg:"Teacher not found"})
        }
    },
    all: async (req, res) => {
        let all = await TeacherModel.find().populate("students")
        res.json(all);
    },
    create: async (req, res) => {   
        let newTeacher = await TeacherModel(req.body)
        let savedUser = await newTeacher.save()
        res.json(savedUser)
    },
    getAllStudent: async (req, res) =>{
            try{

                let allStudent = await StudentModel.find({teacher: req.params.id}).sort({roll_no: -1}).populate("teacher")
                res.json(allStudent)
            }
            catch(err){
                console.log(err)
            }
    },
    deleteTeacher: async (req, res) =>{
        try{
            let deletedTeacher = await TeacherModel.findByIdAndDelete({fbid:req.params.id})
            if (!deletedTeacher) {
              res.status(400).json({msg:"Teacher not found"})
              }
            res.json("Teacher deleted successfully")
        }
        catch(err){
            console.log(err)
        }
    },
    UpdateTeacher: async (req, res) =>{
        try{
            let UpdateTeacher = await TeacherModel.findByIdAndUpdate({fbid:req.params.id}).populate("students")
            if (!UpdateTeacher) {
              res.status(400).json({msg:"Teacher not found"})
    }
    res.json("Teacher Updated ")
}
    catch(err){
        console.log(err)
    }

},
  sortStudent: async (req, res) =>{
    try {
        let allStudent = await StudentModel.find({Teacher: req.params.id, registrationCompleted : true}).populate("students")
        .sort({name: -1})
      res.status(200).json(allStudent);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  filterStudent: async (req, res) =>{
    try {
        let allStudent = await StudentModel.find({Teacher: req.params.id, registrationCompleted : true})
        .sort({name: -1})
      res.status(200).json(allStudent);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  NonfilterStudent: async (req, res) =>{
    try {
        let allStudent = await StudentModel.find({Teacher: req.params.id, registrationCompleted : false})
        .sort({name: -1})
      res.status(200).json(allStudent);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

module.exports = TeacherController