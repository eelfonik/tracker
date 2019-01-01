import * as React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// import { hot } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router'
import HomeLayout from './components/homepageLayout';
import AppLayout from './components/appLayout';
import store from './store/appStore';
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

const App = () => 
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/me' component={AppLayout}/>
        <Route path="/" component={HomeLayout}/>
        {/* don't use exact here, as all the routes components here are meant to contain other routes components.
        if we use exact, all sub-routes defined for these components will never match, thus show a blank page on hard reload.
        Difference between exact path & regular path is https://stackoverflow.com/a/49162423 */}
      </Switch>
    </ConnectedRouter>
  </Provider>

//TODO: the hot reload is totally broken with hooks...
// export default hot(module)(App)
export default App