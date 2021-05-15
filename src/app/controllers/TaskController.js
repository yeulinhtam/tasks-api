const bcrypt = require('bcryptjs');
const authModule = require('./../utills/auth');

const Task = require('./../models/Task');

class TaskController {

    async create(req, res, next) {

        try {
            const { userId, content, deadline } = req.body;
        if (!userId || !content || !deadline) {
           return res.status(400).send({
                message: 'Bad request!',
            })
        }

        const task = new Task({
            user: userId,
            content: content,
            deadline: deadline 
        });

        task.save().then(() => {
            res.status(201).send({
                data: task,
                message: 'Create task successfully!'
            })
        })
        } catch (error) {
            (error) => res.status(500).send({
                messages: error
            })
        }
    }


    async index(req, res, next){
        const data = await Task.find({}).populate('user');
        return  res.status(200).json({
            data: data,
            message: 'Get data succesfully!'
        })
    }
}


module.exports = new TaskController;