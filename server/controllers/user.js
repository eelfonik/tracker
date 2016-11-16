var UserController = function (userModel, session) {

    this.ApiResponse = require('../models/apiResponse.js');
    this.ApiMessages = require('../models/apiMessages.js');
    this.UserProfile = require('../models/userProfile.js');
    this.UserInfo = require('../models/userInfo.js');
    this.userModel = userModel;
    this.session = session;
    this.User = require('../models/user.js');
};

UserController.prototype.getSession = function () {
    return this.session;
};

UserController.prototype.setSession = function (session) {
    this.session = session;
};

UserController.prototype.getInfo = function (callback) {
    var me = this;
    me.userModel.findOne({ email: this.session.userProfileModel.email }, function (err,user) {
        if (err) {
            return callback(err, new me.ApiResponse({
                success: false,
                extras: { msg: me.ApiMessages.DB_ERROR }
            }));
        }

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

UserController.prototype.updateInfo = function(userInfo, callback) {

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

module.exports = UserController;