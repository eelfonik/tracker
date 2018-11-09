//the whole implementation is using the code from https://github.com/MiamiCoder/jquerymobile-tutorial-user-reg-end-to-end/tree/master/conf-rooms-step2/server
//It's a tutorial here http://jorgeramon.me/the-meeting-room-booking-app-tutorial/
class AccountController {
  constructor(userModel, session, mailer) {
    this.crypto = require("crypto");
    this.uuid = require("uuid");
    this.ApiResponse = require("../models/apiResponse.js");
    this.ApiMessages = require("../models/apiMessages.js");
    this.UserProfile = require("../models/userProfile.js");
    this.userModel = userModel;
    this.session = session;
    this.mailer = mailer;
    this.User = require("../models/userSchema.js");
  }

  getSession = () => this.session;

  setSession = session => {
    this.session = session;
  };

  createRes = (resType, extras = {}) => {
    switch (resType) {
      case "error":
        return new this.ApiResponse({
          success: false,
          extras: { msg: this.ApiMessages.DB_ERROR }
        });
      case "duplicate":
        return new this.ApiResponse({
          success: false,
          extras: { msg: this.ApiMessages.EMAIL_ALREADY_EXISTS }
        });
      case "userCreate":
      case "userLoggedIn":
        return new this.ApiResponse({
          success: true,
          extras
        });
      case "cannotCreateUser":
        return new this.ApiResponse({
          success: false,
          extras: { msg: this.ApiMessages.COULD_NOT_CREATE_USER }
        });
      case 'wrongPassword':
        return new this.ApiResponse({
          success: false,
          extras: { msg: this.ApiMessages.INVALID_PWD }
        })
      default:
        throw new Error(
          `an error occured when creating response with ${resType}`
        );
    }
  };

  hashPassword = (password, salt, callback) => {
    // We use pbkdf2 to hash and iterate 10k times by default
    const iterations = 10000;
    const keyLen = 64; // 64 bit.
    this.crypto.pbkdf2(password, salt, iterations, keyLen, "sha512", callback);
  };

  signup = (newUser, callback) => {
    this.userModel.findOne({ email: newUser.email }, (err, user) => {
      if (err) {
        return callback(err, this.createRes("error"));
      }
      if (user) {
        return callback(err, this.createRes("duplicate"));
      }
      newUser.save((err, user, numberAffected) => {
        if (err) {
          return callback(err, this.createRes("error"));
        }
        if (numberAffected === 1) {
          //create a userProfileModel from the UserProfile
          const userProfileModel = new this.UserProfile(user);
          this.session.userProfileModel = userProfileModel;
          this.session.userId = user._id;
          this.session.id = this.uuid.v4();
          return callback(
            err,
            this.createRes("userCreated", {
              userProfileModel: userProfileModel
            })
          );
        }
        return callback(err, this.createRes("cannotCreateUser"));
      });
    });
  };

  login = (email, password, callback) => {
    this.userModel.findOne({ email: email }, (err, user) => {
      if (err) {
        return callback(err, this.createRes("error"));
      }

      if (user) {
        this.hashPassword(password, user.passwordSalt, (err, passwordHash) => {
          if (passwordHash === user.passwordHash) {
            const userProfileModel = new this.UserProfile({
              email: user.email,
              username: user.username
            });

            this.session.userProfileModel = userProfileModel;
            this.session.userId = user._id;
            this.session.id = this.uuid.v4();

            return callback(
              err,
              this.createRes("userLoggedIn", {
                userProfileModel: userProfileModel,
                sessionId: this.session.id,
                userId: this.session.userId
                //should also return the info of user
                //if it's empty, redirect to fill info page
                //else go to dashboard
              })
            );
          } else {
            return callback(
              err,
              this.createRes('wrongPassword')
            );
          }
        });
      } else {
        return callback(
          err,
          new this.ApiResponse({
            success: false,
            extras: { msg: this.ApiMessages.EMAIL_NOT_FOUND }
          })
        );
      }
    });
  };
}

AccountController.prototype.logout = function() {
  //fuck it why I thought the delete here was to set on client side-_-
  //it's used to delete the sessions collection in mongoDB...
  if (this.session.userProfileModel) delete this.session.userProfileModel;
  if (this.session.id) delete this.session.id;
  if (this.session.userId) delete this.session.userId;
  return;
};

AccountController.prototype.resetPassword = function(email, callback) {
  var me = this;
  me.userModel.findOne({ email: email }, function(err, user) {
    if (err) {
      return callback(
        err,
        new me.ApiResponse({
          success: false,
          extras: { msg: me.ApiMessages.DB_ERROR }
        })
      );
    }

    if (user) {
      // Save the user's email and a password reset hash in session.
      var passwordResetHash = me.uuid.v4();
      me.session.passwordResetHash = passwordResetHash;
      me.session.emailWhoRequestedPasswordReset = email;

      me.mailer.sendPasswordResetHash(email, passwordResetHash);

      return callback(
        err,
        new me.ApiResponse({
          success: true,
          extras: { passwordResetHash: passwordResetHash }
        })
      );
    } else {
      return callback(
        err,
        new me.ApiResponse({
          success: false,
          extras: { msg: me.ApiMessages.EMAIL_NOT_FOUND }
        })
      );
    }
  });
};

AccountController.prototype.resetPasswordFinal = function(
  email,
  newPassword,
  newPasswordConfirm,
  passwordResetHash,
  callback
) {
  var me = this;
  if (!me.session || !me.session.passwordResetHash) {
    return callback(
      null,
      new me.ApiResponse({
        success: false,
        extras: { msg: me.ApiMessages.PASSWORD_RESET_EXPIRED }
      })
    );
  }

  if (me.session.passwordResetHash !== passwordResetHash) {
    return callback(
      null,
      new me.ApiResponse({
        success: false,
        extras: { msg: me.ApiMessages.PASSWORD_RESET_HASH_MISMATCH }
      })
    );
  }

  if (me.session.emailWhoRequestedPasswordReset !== email) {
    return callback(
      null,
      new me.ApiResponse({
        success: false,
        extras: { msg: me.ApiMessages.PASSWORD_RESET_EMAIL_MISMATCH }
      })
    );
  }

  if (newPassword !== newPasswordConfirm) {
    return callback(
      null,
      new me.ApiResponse({
        success: false,
        extras: { msg: me.ApiMessages.PASSWORD_CONFIRM_MISMATCH }
      })
    );
  }

  var passwordSalt = this.uuid.v4();

  me.hashPassword(newPassword, passwordSalt, function(err, passwordHash) {
    me.userModel.update(
      { email: email },
      { passwordHash: passwordHash, passwordSalt: passwordSalt },
      function(err, numberAffected, raw) {
        if (err) {
          return callback(
            err,
            new me.ApiResponse({
              success: false,
              extras: { msg: me.ApiMessages.DB_ERROR }
            })
          );
        }

        if (numberAffected < 1) {
          return callback(
            err,
            new me.ApiResponse({
              success: false,
              extras: { msg: me.ApiMessages.COULD_NOT_RESET_PASSWORD }
            })
          );
        } else {
          return callback(
            err,
            new me.ApiResponse({ success: true, extras: null })
          );
        }
      }
    );
  });
};

AccountController.prototype.getUserFromUserRegistration = function(
  userRegistrationModel
) {
  var me = this;

  if (
    userRegistrationModel.password !== userRegistrationModel.passwordConfirm
  ) {
    return new me.ApiResponse({
      success: false,
      extras: { msg: me.ApiMessages.PASSWORD_CONFIRM_MISMATCH }
    });
  }

  var passwordSaltIn = this.uuid.v4(),
    cryptoIterations = 10000, // Must match iterations used in controller#hashPassword.
    cryptoKeyLen = 64, // Must match keyLen used in controller#hashPassword.
    passwordHashIn;

  var user = new this.User({
    email: userRegistrationModel.email,
    username: userRegistrationModel.username,
    passwordHash: this.crypto.pbkdf2Sync(
      userRegistrationModel.password,
      passwordSaltIn,
      cryptoIterations,
      cryptoKeyLen,
      "sha512"
    ),
    passwordSalt: passwordSaltIn
  });

  return new me.ApiResponse({ success: true, extras: { user: user } });
};

module.exports.AccountController;
