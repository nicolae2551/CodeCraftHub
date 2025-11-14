const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/profile', userController.getProfile);

module.exports = router;
