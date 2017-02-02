const InvoiceController = function (invoiceModel, userModel,session) {

    this.ApiResponse = require('../models/apiResponse.js');
    this.ApiMessages = require('../models/apiMessages.js');
    this.InvoiceInfo = require('../models/invoiceInfo.js');
    this.ClientProfile = require('../models/clientProfile.js');
    this.userModel = userModel;
    this.invoiceModel = invoiceModel;
    this.session = session;
    // this.User = require('../models/userSchema.js');
    this.Invoice = require('../models/invoiceSchema.js');
};

InvoiceController.prototype.getSession = function () {
    return this.session;
};

InvoiceController.prototype.setSession = function (session) {
    this.session = session;
};

InvoiceController.prototype.getInvoicesInfo = function (callback) {
    var me = this;
    //TODO: the number below should get from session
    me.invoiceModel.findOne({ number: 1 }, function (err,invoice) {
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

            return callback(err, new me.ApiResponse({
                success: true,
                extras: {
                    invoiceInfoModel: invoiceInfoModel,
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

InvoiceController.prototype.addNewInvoice = function (newInvoice, callback) {
    var me = this;
    me.invoiceModel.findOne({ number: newInvoice.number }, function (err, invoice) {

        if (err) {
            return callback(err, new me.ApiResponse({
                success: false,
                extras: { msg: me.ApiMessages.DB_ERROR }
            }));
        }

        if (invoice) {
            return callback(err, new me.ApiResponse({
                success: false,
                extras: { msg: me.ApiMessages.INVOICE_ALREADY_EXISTS }
            }));
        } else {

            newInvoice.save(function (err, invoice, numberAffected) {

                if (err) {
                    return callback(err, new me.ApiResponse({
                        success: false,
                        extras: { msg: me.ApiMessages.DB_ERROR }
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

                    return callback(err, new me.ApiResponse({
                        success: true,
                        extras: {
                            invoiceInfoModel: invoiceInfoModel
                        }
                    }));
                } else {
                    return callback(err, new me.ApiResponse({
                        success: false,
                        extras: { msg: me.ApiMessages.COULD_NOT_CREATE_INVOICE }
                    }));
                }

            });
        }

    });
};

InvoiceController.prototype.updateInvoiceInfo = function(userInfo, callback) {

    var me = this;
    // add {new:true} to tell mongoose return the updated value
    //http://stackoverflow.com/a/32811548/6849186
    //{upsert: true} is used to tell if there's no existing field, create one
    me.userModel.findOneAndUpdate({ email: this.session.userProfileModel.email }, {info: userInfo}, {new: true, upsert:true},function (err, user) {

        if (err) {
            return callback(err, new me.ApiResponse({
                success: false,
                extras: { msg: me.ApiMessages.DB_ERROR }
            }));
        }

        //if find a user by email
        if (user) {
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
        _creator:me.session.userId,
        number:invoiceInputModel.number,
        date: invoiceInputModel.date,
        sum: invoiceInputModel.sum,
        taxRate: invoiceInputModel.taxRate,
        currency: invoiceInputModel.currency,
        description: invoiceInputModel.description
    });

    return new me.ApiResponse({ success: true, extras: { invoice:invoice } });
}

module.exports = InvoiceController;
