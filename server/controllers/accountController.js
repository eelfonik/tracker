//the whole implementation is using the code from https://github.com/MiamiCoder/jquerymobile-tutorial-user-reg-end-to-end/tree/master/conf-rooms-step2/server
//It's a tutorial here http://jorgeramon.me/the-meeting-room-booking-app-tutorial/
class AccountController {
  constructor(userModel, session, mailer) {
    this.crypto = require("crypto");
    this.uuid = require("uuid/v4");
    this.UserProfile = require("../models/userProfile.js");
    this.userModel = userModel;
    this.session = session;
    this.mailer = mailer;
    this.User = require("../models/userSchema.js");
    this.createRes = require("../utils/createServerRes.js")
  }

  hashPassword(password, salt, callback) {
    // We use pbkdf2 to hash and iterate 10k times by default
    const iterations = 10000;
    const keyLen = 64; // 64 bit.
    this.crypto.pbkdf2(password, salt, iterations, keyLen, "sha512", callback);
  };

  signup(newUser, callback) {
    this.userModel.findOne({ email: newUser.email }, (err, user) => {
      if (err) {
        return callback(err, this.createRes("DB_ERROR"));
      }
      if (user) {
        return callback(err, this.createRes("EMAIL_ALREADY_EXISTS"));
      }
      newUser.save((err, user) => {
        if (err) {
          return callback(err, this.createRes("DB_ERROR"));
        }
        //create a userProfileModel from the UserProfile
        const userProfileModel = new this.UserProfile(user);
        this.session.userProfileModel = userProfileModel;
        this.session.userId = user._id;
        console.log('session?', this.session);
        return callback(
          err,
          this.createRes("userCreated", {
            userProfileModel: userProfileModel
          })
        );
      });
    });
  };

  login(email, password, callback) {
    this.userModel.findOne({ email: email }, (err, user) => {
      if (err) {
        return callback(err, this.createRes("DB_ERROR"));
      }

      if (user) {
        this.hashPassword(password, user.passwordSalt, (err, passwordHash) => {
          console.log("this called back should be triggered", {err, passwordHash}, user);
          if (passwordHash === user.passwordHash) {
            const userProfileModel = new this.UserProfile({
              email: user.email,
              username: user.username
            });

            this.session.userProfileModel = userProfileModel;
            this.session.userId = user._id;
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
          }
          return callback(err, this.createRes("INVALID_PWD"));
        });
      } else {
        return callback(err, this.createRes("EMAIL_NOT_FOUND"));
      }
    });
  };

  logout() {
    //fuck it why I thought the delete here was to set on client side-_-
    //it's used to delete the sessions collection in mongoDB...
    this.session.destroy((err) => {
      // cannot access session here
    });
    return;
  };

  resetPassword(email, callback) {
    this.userModel.findOne({ email: email }, (err, user) => {
      if (err) {
        return callback(err, this.createRes("DB_ERROR"));
      }
      if (user) {
        // Save the user's email and a password reset hash in session.
        var passwordResetHash = this.uuid();
        this.session.passwordResetHash = passwordResetHash;
        this.session.emailWhoRequestedPasswordReset = email;

        this.mailer.sendPasswordResetHash(email, passwordResetHash);

        return callback(
          err,
          this.createRes("resetPassword", {
            passwordResetHash: passwordResetHash
          })
        );
      }
      return callback(err, this.createRes("EMAIL_NOT_FOUND"));
    });
  };

  resetPasswordFinal(
    email,
    newPassword,
    newPasswordConfirm,
    passwordResetHash,
    callback
  ) {
    if (!this.session || !this.session.passwordResetHash) {
      return callback(null, this.createRes("PASSWORD_RESET_EXPIRED"));
    }

    if (this.session.passwordResetHash !== passwordResetHash) {
      return callback(null, this.createRes("PASSWORD_RESET_HASH_MISMATCH"));
    }

    if (this.session.emailWhoRequestedPasswordReset !== email) {
      return callback(null, this.createRes("PASSWORD_RESET_EMAIL_MISMATCH"));
    }

    if (newPassword !== newPasswordConfirm) {
      return callback(null, this.createRes("PASSWORD_CONFIRM_MISMATCH"));
    }

    const passwordSalt = this.uuid();

    this.hashPassword(newPassword, passwordSalt, (err, passwordHash) => {
      this.userModel.update(
        { email: email },
        { passwordHash: passwordHash, passwordSalt: passwordSalt },
        (err, raw) => {
          if (err) {
            return callback(err, this.createRes("DB_ERROR"));
          }
          return callback(err, this.createRes("success"));
        }
      );
    });
  };

  getUserFromUserRegistration(userRegistrationModel) {
    if (
      userRegistrationModel.password !== userRegistrationModel.passwordConfirm
    ) {
      this.createRes("PASSWORD_CONFIRM_MISMATCH");
    }

    const passwordSaltIn = this.uuid();
    const cryptoIterations = 10000; // Must match iterations used in controller#hashPassword.
    const cryptoKeyLen = 64; // Must match keyLen used in controller#hashPassword.

    const user = new this.User({
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
    return this.createRes("registerSuccess", { user: user });
  };
}

module.exports = AccountController;
