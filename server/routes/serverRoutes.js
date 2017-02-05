const express = require('express');
const router = express.Router();

//3 schemas
const User = require('../models/userSchema.js');
const Client = require('../models/clientSchema');
const Invoice = require('../models/invoiceSchema');

const ApiResponse = require('../models/apiResponse.js');
// =========================================
// account
// ==========================================
const AccountController = require('../controllers/accountController.js');
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
const UserController = require('../controllers/userController.js');
const UserInfo = require('../models/userInfo.js');
// =========================================
// invoice
// ==========================================
const InvoiceController = require('../controllers/invoiceController.js');
const InvoiceInfo = require('../models/invoiceInfo.js');
const InvoiceNumber =require('../models/invoiceNumber');
// =========================================
// client
// ==========================================
//const ClientController = require('../controllers/clientSchema.js');
//const ClientProfile = require('../models/clientProfile.js');



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
        //get user info
        const userController = new UserController(User, req.session);

        userController.getInfo(function (error,response) {
            res.send(response);
        });
    })
    .post(function (req, res) {
        //update user info
        const userController = new UserController(User, req.session);
        const userInfo = new UserInfo(req.body);
        userController.updateInfo(userInfo,function (error,response) {
            res.send(response);
        });
    });

// --------------invoices--------------------

router.route('/user/invoices')

    .get(function (req, res) {
        //Get all the invoices.
        const invoiceController = new InvoiceController(Invoice, User, req.session);
        invoiceController.getUserInvoices(function (error,response) {
            res.send(response);
        });
    });


router.route('/user/invoice')

    .get(function (req, res) {
        //get a single invoice by number
        const invoiceController= new InvoiceController(Invoice, User, req.session);
        //here the req.body should send from actions that returns an id/or invoice number
        const invoiceNumber = new InvoiceNumber(req.body);

        invoiceController.getSingleInvoice(invoiceNumber,function (error,response) {
            res.send(response);
        });
    })
    .post(function (req, res) {
        //create a new invoice
        const invoiceController= new InvoiceController(Invoice, User, req.session);
        const invoiceInfo = new InvoiceInfo(req.body);

        const userController = new UserController(User,req.session);

        const apiResponseGetNewInvoice = invoiceController.getInvoiceFromUserInput(invoiceInfo);
        res.set("Access-Control-Allow-Origin", "http://localhost:5000");   // Enable CORS in dev environment.

        if (apiResponseGetNewInvoice.success) {
            invoiceController.addNewInvoice(apiResponseGetNewInvoice.extras.invoice, function (err,apiResponseAddNewInvoice) {
                return res.send(apiResponseAddNewInvoice);
            });
        } else {
            res.send(apiResponseGetNewInvoice);
        }
    });


module.exports = router;
