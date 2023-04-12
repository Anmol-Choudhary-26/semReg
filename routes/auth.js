const express = require('express');
const  router = express.Router();
const authControllers = require('../controllers/firebase')

router.route('/signup').post(authControllers.createuser);
router.route('/login').post(authControllers.signin);
router.route('/logout').post(authControllers.SIGNout)
module.exports = router;