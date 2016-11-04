var express = require('express');
var router = express.Router();
var AccountController = require('../controllers/account.js');
var UserSignup = require('../models/userSignup.js');
var UserLogin = require('../models/userLogin.js');
var User = require('../models/user.js');
var ApiResponse = require('../models/apiResponse.js');
var UserPasswordReset = require('../models/userPwdReset.js');
var UserPasswordResetFinal = require('../models/userPwdResetFinal.js');
var session = [];
var MailerMock = require('../test/mailerMock.js');
var mailer = new MailerMock();


router.route('/account/signup')

    .post(function (req, res) {

        var accountController = new AccountController(User, req.session, mailer);
        var userSignup = new UserSignup(req.body);

        var apiResponseStep1 = accountController.getUserFromUserRegistration(userSignup);

        res.set("Access-Control-Allow-Origin", "http://localhost:5000");   // Enable CORS in dev environment.

        if (apiResponseStep1.success) {
            accountController.signup(apiResponseStep1.extras.user, function (err, apiResponseStep2) {

                return res.send(apiResponseStep2);
            });
        } else {
            res.send(apiResponseStep1);
        }
    });

router.route('/account/login')

    .post(function (req, res) {

        var accountController = new AccountController(User, req.session, mailer);

        var userLogin = new UserLogin(req.body);

        accountController.login(userLogin.email, userLogin.password, function (err, response) {

            return res.send(response);
        });
    });

router.route('/account/logout')

    .get(function (req, res) {

        var accountController = new AccountController(User, req.session, mailer);
        accountController.logout();
        res.send(new ApiResponse({ success: true }));
    })
    .post(function (req, res) {

        var accountController = new AccountController(User, req.session, mailer);
        accountController.logout();
        res.send(new ApiResponse({ success: true }));
    });

router.route('/account/resetpassword')
    .post(function (req, res) {

        var accountController = new AccountController(User, req.session, mailer);
        var userPasswordReset = new UserPasswordReset(req.body);
        accountController.resetPassword(userPasswordReset.email, function (err, response) {
            return res.send(response);
        });
    });

router.route('/account/resetpasswordfinal')
    .post(function (req, res) {

        var accountController = new AccountController(User, req.session, mailer);
        var userPasswordResetFinal = new UserPasswordResetFinal(req.body);
        accountController.resetPasswordFinal(userPasswordResetFinal.email, userPasswordResetFinal.newPassword, userPasswordResetFinal.newPasswordConfirm, userPasswordResetFinal.passwordResetHash, function (err, response) {
            return res.send(response);
        });
    });

module.exports = router;