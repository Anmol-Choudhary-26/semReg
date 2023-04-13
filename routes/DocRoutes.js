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
router.route('/odoc/:id').get(getDoc).patch(updateDoc).delete(deleteDoc)
router.route('/udoc').get()

module.exports = router
