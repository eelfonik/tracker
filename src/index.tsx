import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import GlobalReset from './commonStyles/reset'
import GlobalFont from './commonStyles/font'

const rootEl = document.getElementById('root');
ReactDOM.render(
  <React.Fragment>
    <GlobalReset />
    <GlobalFont />
    <App />
  </React.Fragment>,
  rootEl
);
