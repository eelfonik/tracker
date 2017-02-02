// ./server/models/client.js
const User = require('./userSchema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    _creator : {
        type: Schema.Types.ObjectId, ref: 'User'
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