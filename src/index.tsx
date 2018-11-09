import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import store from './store/appStore';
import App from './app';
// import createHistory from 'history/createBrowserHistory';

// const history = createHistory();
//issue with react hot loader new 3.0.0 to work with HMR
//see https://github.com/maxfarseer/redux-ru-tutorial/issues/2

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);
