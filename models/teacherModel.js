const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
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
  students:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]  
})

module.exports = mongoose.model('Teacher', TeacherSchema)
