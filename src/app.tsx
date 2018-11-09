import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import HomeLayout from './components/homepageLayout/homepageLayout';
import AppLayout from './components/appLayout/appLayout';
import store from './store/appStore';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/me' component={AppLayout}/>
        <Route path="/" component={HomeLayout}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;