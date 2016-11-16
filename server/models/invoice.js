// ./server/models/invoice.js
const User = require('./user');
const Client = require('./client');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    _creator : {
        type: Number, ref: 'User'
    },
    number: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sum: {
        type: String,
        required: true
    },
    taxRate: {
        type: String,
    },
    currency: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Invoice', InvoiceSchema);