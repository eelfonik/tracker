import React from 'react';
import PropTypes from 'prop-types';
// import { Link, Route } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import homepageStyle from './homepageLayout.css';
import SignupPage from './signupPage/signupPage';
import LoginPage from './loginPage/loginPage';
// This imported styles globally without running through CSS Modules
// see https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
//import '!style!css!../../commonStyles/reset.css';
//import '!style!css!../../commonStyles/font.css';

const signup = () => <div>heuehfworhwqo</div>;

class HomeLayout extends React.Component {

  componentDidUpdate() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      // browserHistory.replace(redirectUrl)
    }
  }

  maybeRenderNotif() {
    if (!this.props.isLoggedIn) {
      return (
        <div>{this.props.notif}</div>
      );
    }
  }

  render() {
    console.debug("check homepage props", this.props);
    const url = this.props.match.url;
    return (
      <div className={homepageStyle.appContainer}>
        <header className={homepageStyle.header}>
          <Link to="/">
            <img className={homepageStyle.logo} src="/img/node.svg" />
          </Link>
          <Link className={homepageStyle.signupLink} to="/signup">sign up</Link>
          <Link className={homepageStyle.signupLink} to="/login">Login</Link>
        </header>
        <div className={homepageStyle.appContent}>
          <Route exact path={url} render={() => (
            <div>WELCOME!</div>
          )} />
          <Route path='/signup' component={SignupPage} />
          <Route path='login' component={LoginPage} />
        </div>
        <footer className={homepageStyle.footer}>
          <p>
            <a href="http://mern.io/" target="_blank" rel="noopener noreferrer">MERN</a> build by hand.
          </p>
        </footer>
      </div>
    );
  }
}
// HomeLayout.propTypes = {
//     isLoggedIn: PropTypes.bool,
//     notif: PropTypes.string,
//     extras: PropTypes.object,
// }

// function mapStateToProps(state, ownProps) {
//     return {
//         isLoggedIn: state.login.isLoggedIn,
//         currentURL: ownProps.location.pathname,
//         notif: state.login.notif,
//         redirectUrl: state.login.redirectUrl,
//         extras: state.login.extras
//     }
// }

// export default connect(mapStateToProps)(HomeLayout);
export default HomeLayout;