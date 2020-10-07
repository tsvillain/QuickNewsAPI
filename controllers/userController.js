const User = require('../models/userModel');
const filter = require('../utils/filter');
const crypto = require('crypto');
const salt = process.env.SALT || "gN9bPF4KbB";


exports.createUser = async (req, res) => {

    const { firstName, lastName, username, email, password } = req.body;
    try {
        if (!email) return next(new Error('Email is Required'));
        if (!firstName) return next(new Error('First Name is Required'));
        if (!lastName) return next(new Error('Last Name is Required'));
        if (!username) return next(new Error('Username is Required'));
        if (!password) return next(new Error('Password is Required'));

        const hashedPass = crypto.pbkdf2Sync(password, salt, 8, 12, "sha256");

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
            password: hashedPass,
        });

        res.status(200).json({
            status: 'success',
            data: createUser,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPass = crypto.pbkdf2Sync(password, salt, 8, 12, "sha256");
        const user = await User.findOne({ username: username, password: hashedPass }, { password: 0 });
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
}

exports.getAllUser = async (_, res) => {
    try {
        const user = await User.find({}, { password: 0 });
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.body._id, { password: 0 });
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error('User must have a id');
        }
        const filterBody = filter.filterObj(req.body, 'firstName', 'lastName', 'username', 'isWritter');
        const updatedUser = await User.findByIdAndUpdate(req.params.id, filterBody, { new: true });
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

