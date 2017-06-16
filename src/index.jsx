import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import store from './store/appStore';
import App from './app';
// window.onload = () => {
//     ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
// };


//issue with react hot loader new 3.0.0 to work with HMR
//see https://github.com/maxfarseer/redux-ru-tutorial/issues/2

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./app', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./app').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <ListeningRouter>
            <NextApp />
          </ListeningRouter>
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}

//ReactDOM.render(<AppRoutes/>, document.getElementById('root'));
