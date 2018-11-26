import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { hot } from 'react-hot-loader'
import HomeLayout from './components/homepageLayout';
import AppLayout from './components/appLayout';

const LoginContext = React.createContext(false);

function App() {
  const isLoggedIn = React.useContext(LoginContext)
  return (
    <Switch>
      <Route path='/me' component={AppLayout}/>
      <Route path="/" component={HomeLayout}/>
      {/* don't use exact here, as all the routes components here are meant to contain other routes components.
      if we use exact, all sub-routes defined for these components will never match, thus show a blank page on hard reload.
      Difference between exact path & regular path is https://stackoverflow.com/a/49162423 */}
    </Switch>
  )
}

//TODO: the hot reload is totally broken with hooks...
// export default hot(module)(App)
export default App