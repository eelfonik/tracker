import React from 'react';
import {connect} from 'react-redux';
// import { Router, browserHistory, IndexRoute, Route} from 'react-router';
import { Switch, BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import HomeLayout from './components/homepageLayout/homepageLayout';
import AppLayout from './components/appLayout/appLayout';


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
const PrivateRoute = ({ component: Component, path:path }) => (
  <Route path={path} render={props => (
    props.isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomeLayout}/>
                    <PrivateRoute 
                        path='/me' 
                        component={AppLayout} 
                        isLoggedIn={this.props.isLoggedIn}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.login.isLoggedIn,
        // currentURL: ownProps.location.pathname,
        notif: state.login.notif,
        redirectUrl: state.login.redirectUrl,
        extras: state.login.extras
    }
}
export default connect(mapStateToProps)(App);