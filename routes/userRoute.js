const express = require('express');
const userController = require('../controllers/userController');
const authVerify = require('../middleware/authToken');
const router = express.Router();

router.route('/register').post(userController.uploadProfile, userController.createUser);
router.route('/login').post(userController.loginUser);
// router.route('/uploadProfile').post(upload.single('photo'), userController.uploadProfile);
//Temp will be closed later (Just for testing)
router.route('/').get(userController.getAllUser);
router.route('/data').post(authVerify, userController.getSingleUser);
router.route('/:id').patch(authVerify, userController.updateUser);

module.exports = router;
