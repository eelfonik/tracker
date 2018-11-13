import * as React from 'react';
// import { Link, browserHistory } from 'react-router';
import { Link, Redirect, Switch, Route, BrowserRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import appStyle from './appLayout.css';
import { userLogOut, getUserInfo, getUserInvoices } from '../../store/actions';
import { AppState } from '../../store/types'

import Dashboard from './dashboard/dashboard';
import UserInfo from './userInfo/userInfo';
import UserInvoices from './userInvoices/userInvoices';

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getInfo();
    this.props.getInvoices();
  }
  
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const url = this.props.match.url;
    const userName = this.props.extras && this.props.extras.userProfileModel ? this.props.extras.userProfileModel.username : '';
    return this.props.isLoggedIn ? (
      <BrowserRouter>
        <div className={appStyle.appContainer}>
          <header className={appStyle.header}>
            <Link to='/'>
              <img className={appStyle.logo} src="/img/node.svg" />
            </Link>
            <Link to={`${url}`}>Hello {this.capitalizeFirstLetter(userName)}</Link>
            <Link to={`${url}/invoices`}>My invoices</Link>
            <Link to={`${url}/info`}>Profile</Link>
            <div className={appStyle.signupLink} onClick={e => this.props.onLogoutClick()}>Logout</div>
          </header>
          <div className={appStyle.appContent}>
            <Route path={`${url}/invoices`} component={UserInvoices} />
            <Route path={`${url}/info`} component={UserInfo} />
            <Route exact path={`${url}`} component={Dashboard} />
          </div>
          <footer className={appStyle.footer}>

          </footer>
        </div>
      </BrowserRouter>
    ) :
    (<Redirect to="/"/>);
  }
}

const mapStateToProps = (state: AppState, ownProps) => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      currentURL: ownProps.location.pathname,
      extras: state.login.extras
    }
}

// const mapDispatchToProps = (dispatch) => ({
//         onLogoutClick(){
//             dispatch(userLogOut());
//         }
// });
//rather than pass a mapDispatchToProps function to connect,
//we can pass a **configuration object**
//that maps the name of callback function(here is `onLogoutClick`), and the action creator function(`userLogout` in this case)
//NOTE!! that only works with functions has no arguments!!!

export default connect(
  mapStateToProps,
  {
    getInfo: getUserInfo,
    getInvoices: getUserInvoices,
    onLogoutClick: userLogOut
  }
  //mapDispatchToProps
)(AppLayout);