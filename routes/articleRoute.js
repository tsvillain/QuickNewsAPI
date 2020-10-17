const express = require('express');
const articleController = require('../controllers/articleController');
const router = express.Router();
const authVerify = require('../middleware/authToken');

router.route('/').get(authVerify, articleController.allArticle);
router.route('/create/:userID').post(authVerify, articleController.createArticle);
router.route('/like').post(authVerify, articleController.likeArticle);
router.route('/user/:userID').get(authVerify, articleController.singleUserArticle);
router.route('/:articleID').get(authVerify, articleController.singleArticle);
router.route('/:userID/:articleID').patch(authVerify, articleController.updateArticle);
router.route('/:userID/:articleID').delete(authVerify, articleController.deleteArticle);

module.exports = router;