import React from 'react';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
// import { Router, browserHistory, IndexRoute, Route} from 'react-router';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import HomeLayout from './components/homepageLayout/homepageLayout';
import AppLayout from './components/appLayout/appLayout';
import store from './store/appStore';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
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
const PrivateRoute = ({ Component: component, path: path }) => (
  <Route path={path} render={routeProps => (
    props.isLoggedIn ? (
      <Component {...routeProps} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: routeProps.location }
        }} />
      )
  )} />
)

class App extends React.Component {
  render() {
    console.debug("check all props", this.props);
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <PrivateRoute
              path='/me'
              component={AppLayout}
              {...this.props}
            />
            <Route path="/" component={HomeLayout} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
// function mapStateToProps(state, ownProps) {
//   return {
//     isLoggedIn: state.login.isLoggedIn,
//     // currentURL: ownProps.location.pathname,
//     notif: state.login.notif,
//     redirectUrl: state.login.redirectUrl,
//     extras: state.login.extras
//   }
// }
export default App;
// export default connect(mapStateToProps)(App);