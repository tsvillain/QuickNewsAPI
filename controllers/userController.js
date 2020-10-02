const User = require('../models/userModel');
const filter = require('../utils/filter');

exports.createUser = async (req, res) => {

    const { firstName, lastName, username, email } = req.body;
    try {
        if (!email || !firstName || !lastName || !username) {
            throw new Error('All Field are mandatory.');
        }

        //check if user email already exist
        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            throw new Error('Email already exist');
        }

        //create User
        const createUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
        });

        res.status(200).json({
            status: 'success',
            data: createUser,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            data: error.message,
        });
    }
}


exports.getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            data: error.message,
        });
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.body._id);
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            data: error.message,
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error('User must have a id');
        }
        const filterBody = filter.filterObj(req.body, 'firstName', 'lastName', 'username', 'isWritter');
        const updatedUser = await User.findByIdAndUpdate(req.params.id, filterBody, {
            new: true,
        });
        res.status(200).json({
            status: 'success',
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

