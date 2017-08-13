import React from 'react';
// import { Link, browserHistory } from 'react-router';
import { Link, Redirect, Switch, Route, BrowserRouter } from 'react-router-dom';

import { connect } from 'react-redux';
// import { ListeningRouter, Switch, Route } from '../../helpers/listeningRoute';
import globalStyle from '../../commonStyles/reset.css';
import font from '../../commonStyles/font.css';
import appStyle from './appLayout.css';
import { userLogOut, getUserInfo, getUserInvoices } from '../../store/actions';
// This imported styles globally without running through CSS Modules
// see https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
// import '!style!css!../../commonStyles/reset.css';
//import '!style!css!../../commonStyles/font.css';

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
          <Switch>
            <Route exact path={`${url}`} Component={Dashboard} />
            <Route exact path={`${url}/invoices`} component={UserInvoices} />
            <Route exact path={`${url}/info`} component={UserInfo} />
          </Switch>
        </div>
        <footer className={appStyle.footer}>

        </footer>
      </div>
    ) :
    (<Redirect to="/"/>);
  }
}

const mapStateToProps = (state, ownProps) => {
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

export default connect(
  mapStateToProps,
  {
    getInfo: getUserInfo,
    getInvoices: getUserInvoices,
    onLogoutClick: userLogOut
  }
  //mapDispatchToProps
)(AppLayout);