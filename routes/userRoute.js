const express = require('express');
const userController = require('../controllers/userController');
const authVerify = require('../middleware/authToken');
const router = express.Router();

router.route('/register').post(userController.createUser);
router.route('/login').post(userController.loginUser);
//Temp will be closed later (Just for testing)
router.route('/').get(userController.getAllUser);
router.route('/data').post(authVerify, userController.getSingleUser);
router.route('/:id').patch(authVerify, userController.updateUser);

module.exports = router;
