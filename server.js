
const express = require('express');
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const mongoose = require ("mongoose");
const helmet = require('helmet')
const app = express();
const session = require('express-session');
const webpack = require('webpack');

//https://github.com/jdesboeufs/connect-mongo
const MongoStore = require('connect-mongo')(session);
const serverRoutes = require('./server/routes/serverRoutes');

const path = require("path");

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
let db;
// for deploy on heroku || local dev
// see http://stackoverflow.com/a/26855963/6849186
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tracker';

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
    const server = app.listen(process.env.PORT || 5000, () => {
        const port = server.address().port;
        console.log("App now running on port", port);
    });
});

// using webpack-dev-server and middleware in development environment
// N.B. this part is essentially replacing the webpack-dev-server
// which is good in some case if you want the server code & client code run on same port during development
// but to have a more general approch, and make the client/server code serves in seperate ports,
// if(!isProd) {
//   console.log(process.env.NODE_ENV);
//     const webpackDevMiddleware = require('webpack-dev-middleware');
//     const webpackHotMiddleware = require('webpack-hot-middleware');

//     const webpackConfig = require('./webpack.dev.config');
//     const compiler = webpack(webpackConfig);

//     app.use(webpackDevMiddleware(compiler, {
//         noInfo: true,
//         publicPath: webpackConfig.output.publicPath,
//     }));
//     app.use(webpackHotMiddleware(compiler));
// } else {
  app.use(express.static(__dirname + '/public'))
  app.use(express.static(path.join(__dirname, '/dist')))
// }

//const app = new Express();

app.use(helmet())
app.set('trust proxy', 1)
app.use(session({
    secret:'foo',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

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

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', serverRoutes);

//need to use wild card(*) here to let react-router handle all front-end routing
//see https://github.com/ReactTraining/react-router/issues/1047#issuecomment-89611557
app.get('*', (request, response) => {
  response.sendFile(__dirname + '/dist/index.html');
});




