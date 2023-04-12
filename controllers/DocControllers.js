const doc = require('../models/UserDocument')
const asyncWrapper = require('../middleware/async')
// const express = require('express')
// const fileUpload = require('express-fileupload')
const { createCustomError } = require('../errors/custom-error')

const getAllDocs = asyncWrapper(async (req, res) => {
    const Doc = await doc.find({})
    res.status(200).json({ Doc })
})

const createDoc = asyncWrapper(async (req, res) => {
  // const { registrationForm,feeDecuction, feeReceipt,incomeCertificate, castCertificate } = req.files

  // const Doc = new doc({
  //   registrationForm: registrationForm.data,
  //   feeDecuction : feeDecuction,
  //   feeReceipt: feeReceipt.data,
  //   incomeCertificate : incomeCertificate,
  //   castCertificate : castCertificate
  // })

  // Doc.save()
  //   .then(() => res.status(200).send('File uploaded successfully'))
  //   .catch(err => res.status(500).send(err.message))
    const Doc = await doc.create(req.body)
    res.status(201).json({ Doc })
})

const getDoc = asyncWrapper(async (req, res, next) => {
    const Doc = await doc.findOne({ _id: req.body.id })
    if(!Doc){
        return next(createCustomError(`No task with id : ${req.body.id}`, 404))
    }
    res.status(200).json({ User })
})

const deleteDoc = asyncWrapper(async (req, res, next) => {
    const { id: DocID } = req.params
    const Doc = await doc.findOneAndDelete({_id:req.body.id})
    if(!Doc){
        return next(createCustomError(`No task with id : ${req.body.id}`, 404))
    }
    res.status(200).json({ User })
})

const updateDoc = asyncWrapper(async (req, res, next) => {
    const { id: DocID } = req.params
  
    const Doc = await doc.findOneAndUpdate({ _id:req.body.id}, req.body, {
      new: true,
      runValidators: true,
    })
  
    if (!Doc) {
      return next(createCustomError(`No task with id : ${userID}`, 404))
    }
  
    res.status(200).json({ Doc })
  })

  module.exports = {
    getAllDocs,
    createDoc,
    getDoc,
    updateDoc,
    deleteDoc,
  }