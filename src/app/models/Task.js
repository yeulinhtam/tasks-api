const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const Task = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    deadline: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', Task);