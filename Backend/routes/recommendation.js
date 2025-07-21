const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/recommendations', isAuthenticated, recommendationController.getRecommendations);

module.exports = router;