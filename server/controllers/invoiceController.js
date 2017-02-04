const InvoiceController = function(invoiceModel, userModel,session) {

    this.ApiResponse = require('../models/apiResponse.js');
    this.ApiMessages = require('../models/apiMessages.js');
    this.InvoiceInfo = require('../models/invoiceInfo.js');
    this.ClientProfile = require('../models/clientProfile.js');
    this.userModel = userModel;
    this.invoiceModel = invoiceModel;
    this.session = session;
    this.User = require('../models/userSchema.js');
    this.Invoice = require('../models/invoiceSchema.js');
};

InvoiceController.prototype.getSession = function () {
    return this.session;
};

InvoiceController.prototype.setSession = function (session) {
    this.session = session;
};


InvoiceController.prototype.getUserInvoices = function(callback) {
    var me = this;
    //if (this.session && this.session.userId) {
    //     me.invoiceModel.find({_creator: me.session.userId}).exec(function (err,invoices) {
    //
    //     });
        me.invoiceModel.find({ _creator: me.session.userId }).exec(function (err,invoices) {
            if (err) {
                return callback(err, new me.ApiResponse({
                    success: false,
                    extras: { msg: me.ApiMessages.DB_ERROR }
                }));
            }

            if (invoices) {

                return callback(err, new me.ApiResponse({
                    success: true,
                    extras: {
                        invoices: invoices
                    }
                }));

            } else {
                return callback(err, new me.ApiResponse({
                    success: false,
                    extras: { msg: me.ApiMessages.EMAIL_NOT_FOUND }
                }));
            }
        });
    //}
};

InvoiceController.prototype.getSingleInvoice = function (number, callback) {
    var me = this;
    me.invoiceModel.findOne({ number: number }, function (err, invoice) {

        if (err) {
            return callback(err, new me.ApiResponse({
                success: false,
                extras: { msg: me.ApiMessages.DB_ERROR }
            }));
        }

        if (invoice) {
            const invoiceInfoModel = new me.InvoiceInfo({
                number: invoice.number,
                date: invoice.date,
                sum:invoice.sum,
                taxRate:invoice.taxRate,
                currency: invoice.currency,
                description: invoice.description
            });

            me.session.invoiceId = invoice._id;

            return callback(err, new me.ApiResponse({
                success: true,
                extras: {
                    invoiceInfoModel: invoiceInfoModel,
                    invoiceId: me.session.invoiceId
                }
            }));
        }
    });
};

InvoiceController.prototype.addNewInvoice = function (newInvoice, callback) {
    var me = this;
    me.invoiceModel.findOne({ number: newInvoice.number }, function (err, invoice) {

        if (err) {
            return callback(err,new me.ApiResponse({
                success: false,
                extras: {
                    msg: me.ApiMessages.DB_ERROR,
                    error: "db not connected on finding"
                }
            }));
        }

        if (invoice) {
            return callback(err,new me.ApiResponse({
                success: false,
                extras: { msg: me.ApiMessages.INVOICE_ALREADY_EXISTS }
            }));
        } else {

            newInvoice.save(function (err, invoice, numberAffected) {

                if (err) {
                    return callback(err,new me.ApiResponse({
                        success: false,
                        extras: {
                            msg: me.ApiMessages.DB_ERROR,
                            error: err
                        }
                    }));
                }

                if (numberAffected === 1) {
                    //create a invoiceInfoModel from the InvoiceInfo
                    const invoiceInfoModel = new me.InvoiceInfo({
                        _creator:invoice._creator,
                        number: invoice.number,
                        date : invoice.date,
                        sum : invoice.sum,
                        taxRate : invoice.taxRate,
                        currency : invoice.currency,
                        description : invoice.description
                    });

                    me.session.invoiceId = invoice._id;

                    return callback(err,new me.ApiResponse({
                        success: true,
                        extras: {
                            invoiceInfoModel: invoiceInfoModel,
                            invoiceId : me.session.invoiceId
                        }
                    }));
                } else {
                    return callback(err,new me.ApiResponse({
                        success: false,
                        extras: { msg: me.ApiMessages.COULD_NOT_CREATE_INVOICE }
                    }));
                }

            });
        }

    });
};

InvoiceController.prototype.updateInvoiceInfo = function(invoiceInfo, callback) {

    var me = this;
    // add {new:true} to tell mongoose return the updated value
    //http://stackoverflow.com/a/32811548/6849186
    //{upsert: true} is used to tell if there's no existing field, create one
    me.invoiceModel.findOneAndUpdate({ _id: me.session.invoiceId }, {info: invoiceInfo}, {new: true, upsert:true},function (err, invoice) {

        if (err) {
            return callback(err, new me.ApiResponse({
                success: false,
                extras: { msg: me.ApiMessages.DB_ERROR }
            }));
        }

        //if find a invoice by number
        if (invoice) {
            var userInfoModel = new me.UserInfo({
                name: user.info.name,
                address: user.info.address,
                siret:user.info.siret,
                phone:user.info.phone
            });

            return callback(err, new me.ApiResponse({
                success: true,
                extras: {
                    userInfoModel: userInfoModel,
                }
            }));

        } else {
            return callback(err, new me.ApiResponse({
                success: false,
                extras: { msg: me.ApiMessages.EMAIL_NOT_FOUND }
            }));
        }

    });
};

//TODO: InvoiceController.prototype.deleteInvoice


InvoiceController.prototype.getInvoiceFromUserInput = function(invoiceInputModel) {
    const me = this;
    const invoice = new me.Invoice({
        _creator:this.session.userId,
        number:invoiceInputModel.number,
        date: invoiceInputModel.date,
        sum: invoiceInputModel.sum,
        taxRate: invoiceInputModel.taxRate,
        currency: invoiceInputModel.currency,
        description: invoiceInputModel.description
    });

    return new me.ApiResponse({
        success: true,
        extras: { invoice:invoice }
    });
}

module.exports = InvoiceController;
