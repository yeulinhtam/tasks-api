const bcrypt = require('bcryptjs');
const authModule = require('./../utills/auth');

const User = require('./../models/User');

class UserController {

    async create(req, res, next) {
        try {
            const { email, password, confirmPassword, lastName, firstName } = req.body;
            if (!email || !password || !confirmPassword || !lastName || !firstName) {
                return res.status(400).send({
                    message: 'Bad request!',
                })
            }
            const existEmail = await User.findOne({ email: email }).exec();
            if (existEmail) {
                return res.status(409).json({
                    message: "Validation failed",
                    errors: [
                        {
                            "field": "email",
                            "message": "A user with this email address aleready exits!"
                        }
                    ]
                })
            } else {
                if (password !== confirmPassword) {
                    return res.status(409).send({
                        message: "Validation failed",
                        errors: [
                            {
                                "field": "password",
                                "message": "Confirm password not match!"
                            },
                            {
                                "field": "confirmPassword",
                                "message": "Confirm password not match!"
                            }
                        ]
                    })
                }
                const user = new User({
                    email: email,
                    password: bcrypt.hashSync(password),
                    firstName: firstName,
                    lastName: lastName,
                    phone: null,
                    address: null,
                    imageUrl: null
                })
                user.save().then(() => {
                    return res.status(201).json({
                        data: {
                            userData: user,
                            accessToken: authModule.generateToken(user),
                            message: 'Signup user succesfully!'
                        }
                    })
                })
            }

        } catch (err) {
            (err) => res.status(500).send({
                messages: err
            })
        }
    }


    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send({
                    message: 'Bad request!',
                    errors: [
                        {
                            "field": "email",
                            "message": "Email is required!"
                        },
                        {
                            "field": "password",
                            "message": "Password is required!"
                        }
                    ]
                })
            }

            const user = await User.findOne({ email: email }).exec();

            if (!user) {
                return res.status(409).json({
                    message: "Validation failed",
                    errors: [
                        {
                            "field": "email",
                            "message": "Email not found!"
                        }
                    ]
                })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, user.password)

                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Login Failed",
                        errors: [
                            {
                                "field": "password",
                                "message": "Password not true!"
                            }
                        ]
                    })
                }
                var token = authModule.generateToken(user);

                return res.status(200).send({
                    data: {
                        userData: user,
                        accessToken: token,
                        message: 'Signup user succesfully!'
                    }
                })
            }

        } catch (err) {
            (err) => res.status(500).send({
                messages: err
            })
        }
    }

    async index(req, res, next) {
        const data = await User.find({});

        return res.status(200).json({
            data: data,
            message: 'Get data succesfully!'
        })
    }
}


module.exports = new UserController;