const express = require('express');
const router = express.Router();

const categoryController = require('./../app/controllers/CategoryController');

router.post('/create', categoryController.create);


module.exports = router;