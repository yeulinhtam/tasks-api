const express = require('express');

const router = express.Router();

const authModule = require('./../app/utills/auth.js');
const userController = require('./../app/controllers/UserController');

router.post('/create', userController.create);
router.post('/login', userController.login);
router.get('/', userController.index);
// router.put('/:id', authModule.isAuth, upload.single('image'), userController.upload);



module.exports = router;