const mongoose = require('mongoose')

const DocSchema = new mongoose.Schema({
  registrationForm:{
    type: String,
    required: true
  },
  feeDeduction:{
    type:Boolean,
    default:false,
  },
  feeReceipt:{
    type: String,
    required:true
  },
  incomeCertificate:{
    type:String,
  },
  castCertificate:{
    type:String,
  },
  modelAId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'userModel',
    } ,
})


module.exports = mongoose.model('Doc', DocSchema)
