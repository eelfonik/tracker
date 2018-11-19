import * as React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router'
import HomeLayout from './components/homepageLayout';
import AppLayout from './components/appLayout';
import store from './store/appStore';
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

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

//TODO: the hot reload is totally broken with hooks...
export default hot(module)(App)