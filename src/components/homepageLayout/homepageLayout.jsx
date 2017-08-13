import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import homepageStyle from './homepageLayout.css';
import SignupPage from './signupPage/signupPage';
import LoginPage from './loginPage/loginPage';
import { Link, Redirect, Switch, Route, BrowserRouter } from 'react-router-dom';
// import { ListeningRouter, Switch, Route } from '../../helpers/listeningRoute';
import { userLogin, userSignup, resetNotif } from '../../store/actions';
// This imported styles globally without running through CSS Modules
// see https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
//import '!style!css!../../commonStyles/reset.css';
//import '!style!css!../../commonStyles/font.css';

const HomeLayout = (props) => {
  const url = props.match.url;
  return props.isLoggedIn ? (
      <Redirect to="/me" />
    ) :
    (
    <BrowserRouter>
      <div className={homepageStyle.appContainer}>
        <header className={homepageStyle.header}>
          <Link to="/">
            <img className={homepageStyle.logo} src="/img/node.svg" />
          </Link>
          <Link className={homepageStyle.signupLink} to='/signup'>sign up</Link>
          <Link className={homepageStyle.signupLink} to='/login'>Login</Link>
        </header>
        <div className={homepageStyle.appContent}>
          <Route path='/signup' render={() => <SignupPage {...props}/>} />
          <Route path='/login' render={() => <LoginPage {...props}/>} />
          <Route exact path='/' render={() => (
            <div>
              <h1>WELCOME</h1>
              <div>Free tracker is a service let you easily track your invoices and payment as a freelancer, enjoy!</div>
            </div>
          )} /> 
        </div>
        <footer className={homepageStyle.footer}>
          <p>
            <a href="http://mern.io/" target="_blank" rel="noopener noreferrer">MERN</a> build by hand.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

HomeLayout.propTypes = {
  isLoggedIn: PropTypes.bool,
  notif: PropTypes.string,
  extras: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    // currentURL: ownProps.location.pathname,
    notif: state.login.notif,
    extras: state.login.extras
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignupClick: (value) => { dispatch(userSignup(value)) },
    onLoginClick: (value) => { dispatch(userLogin(value)) },
    resetNotif: () => { dispatch(resetNotif()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
