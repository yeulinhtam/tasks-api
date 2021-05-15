const express = require('express');
const router = express.Router();

const taskController = require('./../app/controllers/TaskController');

router.get('/',taskController.index);
router.post('/create', taskController.create);


module.exports = router;