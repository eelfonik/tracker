var express = require('express');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var mongoose = require ("mongoose");
var app = express();
var session = require('express-session');

//https://github.com/jdesboeufs/connect-mongo
const MongoStore = require('connect-mongo')(session);
const serverRoutes = require('./server/routes/serverRoutes');

var path = require("path");

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
// for deploy on heroku || local dev
// see http://stackoverflow.com/a/26855963/6849186
var uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tracker';

// Connect to the database before starting the application server.
mongoose.connect(uri, function (err, database) {
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

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    });

    app.use(middleware);
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

app.use(session({
    secret:'foo',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));


app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.resolve(__dirname, 'public/img')));
app.use(express.static(__dirname + '/dist'));
//app.use(express.static(path.resolve(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//
// router.use('*', function(req, res) {
//     // Note that req.url here should be the full URL path from
//     // the original request, including the query string.
//     match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
//         if (error) {
//             res.status(500).send(error.message)
//         } else if (redirectLocation) {
//             res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//         } else if (renderProps) {
//             res.status(200).send(renderToString(React.createElement(RoutingContext, renderProps)))
//         } else {
//             res.status(404).send('Not found')
//         }
//     });
// });

// views is directory for all template files
// app.set('views', path.join(__dirname, 'dist/views'));
// app.set('view engine', 'ejs');
//
// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', serverRoutes);

//need to use wild card(*) here to let react-router handle all front-end routing
//see https://github.com/ReactTraining/react-router/issues/1047#issuecomment-89611557
app.get('*', function(request, response) {
    response.sendFile(__dirname + '/dist/index.html');
});




