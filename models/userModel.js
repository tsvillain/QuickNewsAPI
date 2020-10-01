const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'User First Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'User Last Name is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email ID is required'],
        unique: true,
    },
    isWritter: {
        type: Boolean,
        default: false,
    },
    bio: {
        type: String,
        maxlength: 100,
    },
    profilePicture: {
        type: String,
        default: 'DefaultUser.png',
    },
    joinInDate: {
        type: Date,
        default: Date.now()
    },
    bookmarkedArticles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        }
    ],
    likedArticles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        }
    ],
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;