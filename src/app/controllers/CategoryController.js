const Category = require('./../models/Category');

class CategoryController {
    constructor(name) {
        this.name = name
    }

    index() {

    }

    create(req, res, next) {
        try {
            const { name } = req.body;

            if(!name){
                return res.status(400).json({
                    message: 'Bad request!'
                })
            }
            const category = new Category({
                name: name
            })

            category.save().then(() => {
                return res.status(201).json({
                    data: category,
                    message: 'Create category successfully'
                })
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }

    }
}


module.exports = new CategoryController;