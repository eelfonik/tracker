class UserController {
  constructor(userModel, session) {
    this.UserProfile = require("../models/userProfile.js");
    this.UserInfo = require("../models/userInfo.js");
    this.InvoiceInfo = require("../models/invoiceInfo.js");
    this.userModel = userModel;
    //this.invoiceModel = invoiceModel;
    this.session = session;
    //this.User = require('../models/userSchema.js');
    this.Invoice = require("../models/invoiceSchema");
    this.createRes = require("../utils/createServerRes.js");
  }

  getInfo(callback) {
    //if (this.session && this.session.userProfileModel) {
    this.userModel.findOne(
      { email: this.session.userProfileModel.email },
      (err, user) => {
        if (err) {
          return callback(err, this.createRes("DB_ERROR"));
        }

        if (user) {
          const userInfoModel = new this.UserInfo({
            name: user.info.name,
            address: user.info.address,
            siret: user.info.siret,
            phone: user.info.phone
          });

          const invoicesIds = user.invoices;
          const clientsIds = user.clients;
          const userId = user._id;

          return callback(
            err,
            this.createRes("getUserWithInfos", {
              userInfoModel: userInfoModel,
              invoices: invoicesIds,
              clients: clientsIds,
              userId: userId
            })
          );
        } else {
          return callback(err, this.createRes("EMAIL_NOT_FOUND"));
        }
      }
    );
    //}
  }

  updateInfo(userInfo, callback) {
    // add {new:true} to tell mongoose return the updated value
    //http://stackoverflow.com/a/32811548/6849186
    //{upsert: true} is used to tell if there's no existing field, create one
    this.userModel.findOneAndUpdate(
      { email: this.session.userProfileModel.email },
      { info: userInfo },
      { new: true, upsert: true },
      (err, user) => {
        if (err) {
          return callback(err, this.createRes("DB_ERROR"));
        }

        //if find a user by email
        if (user) {
          const userInfoModel = new this.UserInfo({
            name: user.info.name,
            address: user.info.address,
            siret: user.info.siret,
            phone: user.info.phone
          });

          return callback(
            err,
            this.createRes("updateUserInfo", {
              userInfoModel: userInfoModel
            })
          );
        }
        return callback(err, this.createRes("EMAIL_NOT_FOUND"));
      }
    );
  }

  updateInvoicesId(newInvoiceId, callback) {
    //userInvoices should be an array of ids!!
    //const invoiceIdsArray = ??? should be able to addnew/delete

    // add {new:true} to tell mongoose return the updated value
    //http://stackoverflow.com/a/32811548/6849186
    //{upsert: true} is used to tell if there's no existing field, create one
    this.userModel.findOneAndUpdate(
      { email: this.session.userProfileModel.email },
      { invoices: newInvoiceId },
      { new: true, upsert: true },
      (err, user) => {
        if (err) {
          return callback(err, this.createRes("DB_ERROR"));
        }

        //if find a user by email
        if (user) {
          return callback(
            err,
            this.createRes("updateUserInvoice", { userInvoices: user.invoices })
          );
        } else {
          return callback(err, this.createRes("EMAIL_NOT_FOUND"));
        }
      }
    );
  }
}

module.exports = UserController;
