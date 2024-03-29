const mongoose = require('mongoose')
// const Teacher  = require('./teacherModel')
const UserSchema = new mongoose.Schema({
  fbid:{
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters'],
  },
  
  roll_no: {
    type: String,
    unique: true,
    required:[true,'must provide roll Number']
  },
  year:{
    type: String,
   
  },
  Program:{
    type: String,
    
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
  },
  teacher:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Teacher'
  },
  Dob:{
   type: Date,
  },
  Semester:{
    type:Number,
    default: 6
  },
  Gender:{
   type:String,
   
  },
  Caste:{
    type:String,

  },
  registrationCompleted:{
    type:Boolean,
  },
  remark:{
    type: [String],
  }
})

module.exports = mongoose.model('User', UserSchema)
