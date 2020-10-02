const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/register').post(userController.createUser);
router.route('/').get(userController.getAllUser);
router.route('/data').post(userController.getSingleUser);
router.route('/:id').patch(userController.updateUser);

module.exports = router;
