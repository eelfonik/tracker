// ./server/models/client.js
const User = require('./user');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    _creator : {
        type: Number, ref: 'User'
    },
    clientName: {
        type: String,
        required: true
    },
    clientAddress: {
        type: String,
        required: true
    },
    clientSiret: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);