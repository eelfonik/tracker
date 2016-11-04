// ./server/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: String,
    passwordSalt: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);