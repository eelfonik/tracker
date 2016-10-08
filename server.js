var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

var path = require('path');

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
// import { Server } from 'http';
// import Express from 'express';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { match, RouterContext } from 'react-router';
// import routes from 'src/routes';
// import IndexPage from 'src/components/indexPage';
//import NotFoundPage from './components/NotFoundPage';

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



app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'dist')));

// views is directory for all template files
// app.set('views', path.join(__dirname, 'dist/views'));
// app.set('view engine', 'ejs');
//
// app.get('/', function(request, response) {
//   response.render('pages/index');
// });


app.get('/', function(request, response) {
    response.sendFile(__dirname + '/dist/index.html')
});

// app.get('/cool', function(request, response) {
//   response.send(cool());
// });


app.listen(app.get('port'), function(err) {
    if(err) {
        conole.log(err);
    }
  console.log('Node app is running on port', app.get('port'));
});