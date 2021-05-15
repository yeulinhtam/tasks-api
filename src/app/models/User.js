const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const User = new Schema({
    email: { type: String, unique: true },
    firstName: { type: String, required: true},
    lastName: {type: String, require: true},
    password: { type: String, require: true},
    phone: { type: String},
    address: { type: String},
    imgUrl: { type: String},
    accessToken: { type: String},
    refeshToken: { type: String},
}, {
    timestamps: true
});


module.exports = mongoose.model('User', User);