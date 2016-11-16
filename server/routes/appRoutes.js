const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const ApiResponse = require('../models/apiResponse.js');
// =========================================
// account
// ==========================================
const AccountController = require('../controllers/account.js');
const UserSignup = require('../models/userSignup.js');
const UserLogin = require('../models/userLogin.js');
const UserPasswordReset = require('../models/userPwdReset.js');
const UserPasswordResetFinal = require('../models/userPwdResetFinal.js');
const session = [];
const MailerMock = require('../test/mailerMock.js');
const mailer = new MailerMock();
// =========================================
// user
// ==========================================
const UserController = require('../controllers/user.js');
const UserInfo = require('../models/userInfo.js');



// -----------------------account-----------------------------
router.route('/account/signup')

    .post(function (req, res) {

        const accountController = new AccountController(User, req.session, mailer);
        const userSignup = new UserSignup(req.body);

        const apiResponseStep1 = accountController.getUserFromUserRegistration(userSignup);

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

        const accountController = new AccountController(User, req.session, mailer);

        const userLogin = new UserLogin(req.body);

        accountController.login(userLogin.email, userLogin.password, function (err, response) {

            return res.send(response);
        });
    });

router.route('/account/logout')

    .get(function (req, res) {

        const accountController = new AccountController(User, req.session, mailer);
        accountController.logout();
        res.send(new ApiResponse({ success: true }));
    })
    .post(function (req, res) {

        const accountController = new AccountController(User, req.session, mailer);
        accountController.logout();
        res.send(new ApiResponse({ success: true }));
    });

router.route('/account/resetpassword')
    .post(function (req, res) {

        const accountController = new AccountController(User, req.session, mailer);
        const userPasswordReset = new UserPasswordReset(req.body);
        accountController.resetPassword(userPasswordReset.email, function (err, response) {
            return res.send(response);
        });
    });

router.route('/account/resetpasswordfinal')
    .post(function (req, res) {

        const accountController = new AccountController(User, req.session, mailer);
        const userPasswordResetFinal = new UserPasswordResetFinal(req.body);
        accountController.resetPasswordFinal(userPasswordResetFinal.email, userPasswordResetFinal.newPassword, userPasswordResetFinal.newPasswordConfirm, userPasswordResetFinal.passwordResetHash, function (err, response) {
            return res.send(response);
        });
    });


// -----------------------user-----------------------------

router.route('/user/info')

    .get(function (req, res) {
        const userController = new UserController(User, req.session);

        userController.getInfo(function (error,response) {
            res.send(response);
        });
    })
    .post(function (req, res) {
        const userController = new UserController(User, req.session);
        const userInfo = new UserInfo(req.body);
        userController.updateInfo(userInfo,function (error,response) {
            res.send(response);
        });
    });


module.exports = router;