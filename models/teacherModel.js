const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters'],
  },
  Phone_Number:{
    type:Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  Department:{
    type: String,
    enum: ['Architecture', 'Civil Engineering', 'Computer Science & Engineering', 'Chemistry', 'Chemical Engineering', 'Electrical Engineering', 'Electronics & Communication Engineering', 'Mechanical Engineering', ' 	Material Science & Engineering', 'Mathematics & Scientific Computing', 'Humanities and Social Sciences', ' 	Management Studies', 'Physics & Photonics Science', 'Centre for Energy Studies'], default: 'Computer Science & Engineering', 
  },
  students:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]  
})

module.exports = mongoose.model('Teacher', TeacherSchema)
