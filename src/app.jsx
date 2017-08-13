import React from 'react';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
// import { Router, browserHistory, IndexRoute, Route} from 'react-router';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
// import { ListeningRouter, Switch, Route } from './helpers/listeningRoute';
import HomeLayout from './components/homepageLayout/homepageLayout';
import AppLayout from './components/appLayout/appLayout';
import store from './store/appStore';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
// // good discussion on nested IndexRoute (sort of)
// // https://github.com/ReactTraining/react-router/issues/1950#issuecomment-166742102
// const routes = (
//     <Route path="/" component={Layout}>
//         <Route component={HomeLayout}>
//             <IndexRoute component={IndexPage}/>
//             <Route path="/signup" component={SignupPage}/>
//             <Route path="/login" component={LoginPage}/>
//             {/*<Route path="invoice/:id" component={InvoicePage}/>*/}
//             {/*<Route path="*" component={NotFoundPage}/>*/}
//         </Route>
//         <Route path="/me" component={AppLayout}>
//             <IndexRoute component={Dashboard}/>
//             <Route path="/me/info" component={UserInfo}/>
//             <Route path="/me/invoices" component={UserInvoices}/>
//         </Route>
//     </Route>
// );
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