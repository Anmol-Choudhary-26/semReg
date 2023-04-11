const mongoose = require('mongoose')

const DocSchema = new mongoose.Schema({
  registrationForm:{
    type: mongoose.Schema.Types.Mixed,
    // required: true
  },
  feeDeduction:{
    type:Boolean,
    default:false,
  },
  feeReceipt:{
    type: mongoose.Schema.Types.Mixed,
    // required:true
  },
  incomeCertificate:{
    type: mongoose.Schema.Types.Mixed,
  },
  castCertificate:{
    type: mongoose.Schema.Types.Mixed,
  },
  modelAId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'userModel',
    } ,
    remark:{
      type: String,
    }
})


module.exports = mongoose.model('Doc', DocSchema)

