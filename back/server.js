
const express = require('express');
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const mongoose = require ("mongoose");
const helmet = require('helmet')
const app = express();
const session = require('express-session');

//https://github.com/jdesboeufs/connect-mongo
const MongoStore = require('connect-mongo')(session);
const serverRoutes = require('./server/routes/serverRoutes');

const path = require("path");

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
let db;
// construct mongodb uri from env vars
// N.B: the name of mongodb server name available in network is defined in docker composer file
const serverName = process.env.NODE_ENV === 'prod' ? 'mongo' : 'mongo-dev';
const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${serverName}:27017`;

// Connect to the database before starting the application server.
mongoose.connect(uri, {
  useNewUrlParser: true,
  dbName: process.env.MONGO_INITDB_DATABASE,
}, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    const server = app.listen(process.env.API_PORT || 5000, () => {
        const port = server.address().port;
        console.log("App now running on port", port);
    });
});

// using webpack-dev-server and middleware in development environment
// N.B. this part is essentially replacing the webpack-dev-server
// which is good in some case if you want the server code & client code run on same port during development
// but to have a more general approch, and make the client/server code serves in seperate ports,
// you need to start the backend (be it node or other language like python/scala) & front dev server seperately
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

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', serverRoutes);

//need to use wild card(*) here to let react-router handle all front-end routing
//see https://github.com/ReactTraining/react-router/issues/1047#issuecomment-89611557
app.get('*', (request, response) => {
  response.sendFile(__dirname + '/dist/index.html');
});




