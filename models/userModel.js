const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  _id:{
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
     enum: ['1st', '2nd', '3rd', '4th', '5th'], default: '1st' 
  },
  Program:{
    type: String,
     enum: ['B. Tech.', 'M. Tech.', 'B.Tech. + M. Tech.', 'PHD', 'MSc'], default: 'B. Tech.' 
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
  Teacher:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Teacher'
  },
  Dob:{
   type: Date,
  },
  Semester:{
    type:Number
  },
  Gender:{
   type:String,
   enum: ['Male', 'Female'],
   default: 'Male'
  },
  Caste:{
    type:String,
    enum: ['General', 'Obc', 'Sc/St'], default:'General'
  },
  registrationCompleted:{
    type:Boolean,
  },
  remark:{
    type: String,
  }
})

module.exports = mongoose.model('User', UserSchema)
