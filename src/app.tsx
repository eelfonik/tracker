import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router'
import HomeLayout from './components/homepageLayout/homepageLayout';
import AppLayout from './components/appLayout/appLayout';
import store from './store/appStore';
import {History} from 'history'

interface AppProps {
  history: History;
}

const App = ({history} : AppProps) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/me' component={AppLayout}/>
        <Route path="/" component={HomeLayout}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default hot(module)(App)