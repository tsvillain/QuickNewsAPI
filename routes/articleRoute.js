const express = require('express');
const articleController = require('../controllers/articleController');
const router = express.Router();

router.route('/').get(articleController.allArticle);
router.route('/create/:userID').post(articleController.createArticle);
router.route('/like').post(articleController.likeArticle);
router.route('/user/:userID').get(articleController.singleUserArticle);
router.route('/:articleID').get(articleController.singleArticle);
router.route('/:userID/:articleID').patch(articleController.updateArticle);
router.route('/:userID/:articleID').delete(articleController.deleteArticle);

module.exports = router;