const doc = require('../models/UserDocument')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllDocs = asyncWrapper(async (req, res) => {
    const Doc = await doc.find({})
    res.status(200).json({ Doc })
})

const createDoc = asyncWrapper(async (req, res) => {
    const Doc = await doc.create(req.body)
    res.status(201).json({ Doc })
})

const getDoc = asyncWrapper(async (req, res, next) => {
    const { id: DocID } = req.params
    const Doc = await doc.findOne({ _id: DocID })
    if(!Doc){
        return next(createCustomError(`No task with id : ${DocID}`, 404))
    }
    res.status(200).json({ User })
})

const deleteDoc = asyncWrapper(async (req, res, next) => {
    const { id: DocID } = req.params
    const Doc = await doc.findOneAndDelete({_id:DocID})
    if(!Doc){
        return next(createCustomError(`No task with id : ${DocID}`, 404))
    }
    res.status(200).json({ User })
})

const updateDoc = asyncWrapper(async (req, res, next) => {
    const { id: DocID } = req.params
  
    const Doc = await doc.findOneAndUpdate({ _id: DocID }, req.body, {
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