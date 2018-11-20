class InvoiceController {
  constructor(invoiceModel, userModel, session) {
    this.InvoiceInfo = require("../models/invoiceInfo.js");
    this.ClientProfile = require("../models/clientProfile.js");
    this.userModel = userModel;
    this.invoiceModel = invoiceModel;
    this.session = session;
    this.User = require("../models/userSchema.js");
    this.Invoice = require("../models/invoiceSchema.js");
    this.createRes = require("../utils/createServerRes.js");
  }

  getUserInvoices(callback) {
    this.invoiceModel
      .find({ _creator: this.session.userId })
      .exec((err, invoices) => {
        if (err) {
          return callback(err, this.createRes("DB_ERROR"));
        }
        if (invoices) {
          return callback(
            err,
            this.createRes("getInvoicesSuccess", { invoices })
          );
        }
        return callback(err, this.createRes("EMAIL_NOT_FOUND"));
      });
  }

  getSingleInvoice(number, callback) {
    this.invoiceModel.findOne({ number: number }, (err, invoice) => {
      if (err) {
        return callback(
          err, this.createRes('DB_ERROR')
        );
      }
      if (invoice) {
        const invoiceInfoModel = new this.InvoiceInfo({
          number: invoice.number,
          date: invoice.date,
          sum: invoice.sum,
          taxRate: invoice.taxRate,
          currency: invoice.currency,
          description: invoice.description
        });
  
        this.session.invoiceId = invoice._id;
  
        return callback(
          err, this.createRes('getSingleInvoiceSuccess', {
            invoiceInfoModel: invoiceInfoModel,
            invoiceId: this.session.invoiceId
          })
        );
      }
    });
  }

  addNewInvoice(newInvoice, callback) {
    this.invoiceModel.findOne({ number: newInvoice.number }, (
      err,
      invoice
    ) => {
      if (err) {
        return callback(
          err, this.createRes('DB_ERROR')
        );
      }
      if (invoice) {
        return callback(
          err, this.createRes('INVOICE_ALREADY_EXISTS')
        );
      }
      //nothing wrong, let's create new
      newInvoice.save((err, invoice) => {
        if (err) {
          return callback(
            err, this.createRes('DB_ERROR')
          );
        }
        //create a invoiceInfoModel from the InvoiceInfo
        const invoiceInfoModel = new this.InvoiceInfo({
          _creator: invoice._creator,
          number: invoice.number,
          date: invoice.date,
          sum: invoice.sum,
          taxRate: invoice.taxRate,
          currency: invoice.currency,
          description: invoice.description
        });

        this.session.invoiceId = invoice._id;
        return callback(
          err, this.createRes('newInvoiceAdded', {
            invoiceInfoModel: invoiceInfoModel,
            invoiceId: this.session.invoiceId
          })
        );
      });
    });
  }

  updateInvoiceInfo(invoiceInfo,callback) {
    // add {new:true} to tell mongoose return the updated value
    //http://stackoverflow.com/a/32811548/6849186
    //{upsert: true} is used to tell if there's no existing field, create one
    this.invoiceModel.findOneAndUpdate(
      { _id: this.session.invoiceId },
      { info: invoiceInfo },
      { new: true, upsert: true },
      (err, invoice) => {
        if (err) {
          return callback(
            err, this.createRes('DB_ERROR')
          );
        }
        //if find a invoice by number
        if (invoice) {
          const userInfoModel = new this.UserInfo({
            name: user.info.name,
            address: user.info.address,
            siret: user.info.siret,
            phone: user.info.phone
          });
  
          return callback(
            err, this.createRes('invoiceUpdateSuccess', {userInfoModel})
          );
        } else {
          return callback(
            err, this.createRes('EMAIL_NOT_FOUND')
          );
        }
      }
    );
  }

  //TODO: deleteInvoice

  getInvoiceFromUserInput(invoiceInputModel) {
    const invoice = new this.Invoice({
      _creator: this.session.userId,
      number: invoiceInputModel.number,
      date: invoiceInputModel.date,
      sum: invoiceInputModel.sum,
      taxRate: invoiceInputModel.taxRate,
      currency: invoiceInputModel.currency,
      description: invoiceInputModel.description
    });
    return this.createRes('createInvoic', { invoice })
  } 
}

module.exports = InvoiceController;
