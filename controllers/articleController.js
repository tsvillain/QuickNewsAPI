const Article = require('../models/articleModel');
const User = require('../models/userModel');
const filter = require('../utils/filter');

exports.createArticle = async (req, res, next) => {
    const { title, content, authorId, tags, category } = req.body;
    try {
        if (!req.params.userID) throw new Error('userID is missing');
        if (req.params.userID != req.authData["_id"]) {
            throw new Error('User Authentication Failed. Token Tempered');
        }

        const user = await User.findById(req.params.userID);

        if (!user.isWritter) throw new Error(`${user.firstName}, you don't have write access.`);

        if (!title) throw new Error('Title is Required');
        if (!content) throw new Error('Content is Required');
        if (!authorId) throw new Error('AuthorID is Required');

        const article = await Article.create({
            title: title,
            content: content,
            authorId: authorId,
            tags: tags,
            category: category,
        });

        res.status(200).json({
            status: 'success',
            data: article,
        });


    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.deleteArticle = async (req, res) => {

    try {
        if (!req.params.articleID) throw new Error('ArticleID is missing');
        if (!req.params.userID) throw new Error('UserID is missing');
        if (req.params.userID != req.authData["_id"]) {
            throw new Error('User Authentication Failed. Token Tempered');
        }

        const findArticle = await Article.findById(req.params.articleID);
        if (findArticle.authorId == req.params.userID) {
            const deletedArticle = await Article.findByIdAndDelete(req.params.articleID);
            res.status(200).json({
                status: 'success',
                data: deletedArticle,
            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: "You are not authorized to delete.",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }

};

exports.updateArticle = async (req, res) => {
    try {
        if (!req.params.articleID) throw new Error('ArticleID is missing');
        if (!req.params.userID) throw new Error('UserID is missing');
        if (req.params.userID != req.authData["_id"]) {
            throw new Error('User Authentication Failed. Token Tempered');
        }
        const filterBody = filter.filterObj(req.body, 'title', 'content', 'tags', 'category', 'posterURL');
        const updatedArticle = await Article.findOneAndUpdate(
            {
                "authorId": req.params.userID,
                "_id": req.params.articleID,
            }, filterBody, {
            new: true,
        });
        res.status(200).json({
            status: 'success',
            data: updatedArticle,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.allArticle = async (_, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json({
            status: 'success',
            data: articles,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.singleUserArticle = async (req, res) => {
    try {
        if (!req.params.userID) throw new Error('ArticleID is requried');
        const articles = await Article.find({ 'authorId': req.params.userID });
        res.status(200).json({
            status: 'success',
            data: articles,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.singleArticle = async (req, res) => {
    try {
        if (!req.params.articleID) throw new Error('ArticleID is requried');
        const article = await Article.findById(req.params.articleID);
        res.status(200).json({
            status: 'success',
            data: article,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.likeArticle = async (req, res) => {

    try {
        if (!req.body.userID) throw new Error("userID is missing");
        if (!req.body.articleID) throw new Error("articleID is missing");

        await Article.findByIdAndUpdate(req.body.articleID, { $push: { likes: req.body.userID } });

        const user = User.findByIdAndUpdate(req.body.userID, { $push: { likedArticles: req.body.articleID } });

        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
}