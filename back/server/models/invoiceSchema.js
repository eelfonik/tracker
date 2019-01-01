// ./server/models/invoice.js
const User = require('./userSchema');
const Client = require('./clientSchema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    _creator : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
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