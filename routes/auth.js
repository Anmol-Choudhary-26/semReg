const express = require('express');
const  router = express.Router();
const authControllers = require('../controllers/firebase')

router.route('/signup').post(authControllers.createuser);
router.route('/login').post(authControllers.signin);

module.exports = router;