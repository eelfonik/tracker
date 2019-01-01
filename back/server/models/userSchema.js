// ./server/models/user.js
const Invoice = require('./invoiceSchema');
const Client = require('./clientSchema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: String,
    passwordSalt: String,
    info: {
        name: {
            type: String
        },
        address: {
            type: String
        },
        siret: {
            type: String
        },
        phone: {
            type: String
        }
    },
    invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
    clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);