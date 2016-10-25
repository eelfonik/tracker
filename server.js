var cool = require('cool-ascii-faces');
var express = require('express');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
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
