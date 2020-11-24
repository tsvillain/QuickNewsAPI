const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Article must have Title.'],
        maxlength: 100,
    },
    content: {
        type: String,
        required: [true, 'Article must have Content.'],
        maxlength: 500,
    },
    coverImage: {
        type: String,
        default: 'DefaultUser.png',
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    publishedOn: {
        type: Date,
        default: Date.now(),
    },
    lastEditiedOn: {
        type: Date,
        default: Date.now(),
    },
    tags: [
        {
            type: String,
            default: ['NONE']
        }
    ],
    category: {
        type: String,
        default: 'General'
    },
    posterURL: {
        type: String,
        default: 'default.png'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reader'
        }
    ],
});

const articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;