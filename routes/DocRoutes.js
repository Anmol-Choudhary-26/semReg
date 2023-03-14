const express = require('express')
const router = express.Router()

const {
    getAllDocs,
    createDoc,
    getDoc,
    updateDoc,
    deleteDoc,
} = require('../controllers/DocControllers')

router.route('/').get(getAllDocs).post(createDoc)
router.route('/:id').get(getDoc).patch(updateDoc).delete(deleteDoc)

module.exports = router
