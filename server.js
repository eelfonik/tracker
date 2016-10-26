//var cool = require('cool-ascii-faces');
var express = require('express');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var INVOICES_COLLECTION = "invoices";
var app = express();

var path = require("path");

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('./webpack.config');
    var compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

//const app = new Express();

// new WebpackDevServer(webpack(config),{
//     publicPath: config.output.publicPath,
//     hot: true,
//     historyApiFallback: true,
//     proxy:{
//       "*":"http:localhost:5000"
//     }
// }).listen(3000, 'localhost', function (err, res) {
//     if (err) {
//       return console.debug(err);
//     }
//     console.log("listening at port 3000");
// });

app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.resolve(__dirname, 'public/img')));
app.use(express.static(__dirname + '/dist'));
//app.use(express.static(path.resolve(__dirname, 'dist')));

app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
// views is directory for all template files
// app.set('views', path.join(__dirname, 'dist/views'));
// app.set('view engine', 'ejs');
//
// app.get('/', function(request, response) {
//   response.render('pages/index');
// });


// app.get('/', function(request, response) {
//     response.sendFile(__dirname + '/dist/index.html')
// });

// app.get('/cool', function(request, response) {
//   response.send(cool());
// });

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
// for deploy on heroku || local dev
// see http://stackoverflow.com/a/26855963/6849186
var uri = process.env.MONGODB_URI || 'mongodb://localhost/tacker';

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(uri, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 5000, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// INVOICES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*  "/invoices"
 *    GET: finds all invoices
 *    POST: creates a new invoice
 */

app.get("/invoices", function(req, res) {
    db.collection(INVOICES_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/invoices", function(req, res) {
    var newInvoice = req.body;
    newInvoice.createDate = new Date();

    if (!req.body.invoiceNum) {
        handleError(res, "Invalid invoice", "Must provide a number.", 400);
    }

    db.collection(INVOICES_COLLECTION).insertOne(newContact, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new invoice.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

/*  "/invoices/:id"
 *    GET: find invoice by id
 *    PUT: update invoice by id
 *    DELETE: deletes invoice by id
 */

app.get("/invoices/:id", function(req, res) {
});

app.put("/invoices/:id", function(req, res) {
});

app.delete("/invoices/:id", function(req, res) {
});