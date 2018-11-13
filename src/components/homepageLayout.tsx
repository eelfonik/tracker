import * as React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components'
import SignupPage from './signupPage';
import LoginPage from './loginPage';
import { AppState, LoginState } from '../store/types'
import { Link, Redirect, Switch, Route, BrowserRouter } from 'react-router-dom';

// This imported styles globally without running through CSS Modules
// see https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
//import '!style!css!../../commonStyles/reset.css';
//import '!style!css!../../commonStyles/font.css';

const AppContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AppHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SignUpLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 234, 107,1);
  border-bottom: 1px solid transparent;
  &:hover {
      border-bottom: 1px solid rgba(0, 234, 107,1);
  }
`

const LogoImg = styled.img`
  height:50px;
  max-width:50px;
  &:hover {
      max-width: 100px;
  }
  transition: max-width 0.5s ease;
`

const AppContent = styled.div`
  margin: 20px 0; 
`

const AppFooter = styled.footer`
  font-size: 0.7em;
  & a {
      text-decoration: none;
      color: color(black alpha(50%));
  }
`

const HomeLayout = (props: LoginState) => {
  const url = props.match.url;
  return props.isLoggedIn ? (
      <Redirect to="/me" />
    ) :
    (
    <BrowserRouter>
      <AppContainer>
        <AppHeader>
          <Link to="/">
            <LogoImg src="/img/node.svg" />
          </Link>
          <SignUpLink to='/signup'>sign up</SignUpLink>
          <SignUpLink to='/login'>Login</SignUpLink>
        </AppHeader>
        <AppContent>
          <Route path='/signup' component={SignupPage} />
          <Route path='/login' component={LoginPage} />
          <Route exact path='/' render={() => (
            <div>
              <h1>WELCOME</h1>
              <div>Free tracker is a service let you easily track your invoices and payment as a freelancer, enjoy!</div>
            </div>
          )} /> 
        </AppContent>
        <AppFooter>
          <p>
            <a href="http://mern.io/" target="_blank" rel="noopener noreferrer">MERN</a> build by hand.
          </p>
        </AppFooter>
      </AppContainer>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: AppState) => {
  const { login } = state;
  return {
    isLoggedIn: login.isLoggedIn,
    // currentURL: ownProps.location.pathname,
    notif: login.notif,
    extras: login.extras
  }
}

export default connect(mapStateToProps)(HomeLayout);
