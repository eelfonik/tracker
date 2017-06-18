import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import homepageStyle from './homepageLayout.css';
import SignupPage from './signupPage/signupPage';
import LoginPage from './loginPage/loginPage';
import { ListeningRouter, Switch, Route } from '../../helpers/listeningRoute';
// This imported styles globally without running through CSS Modules
// see https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
//import '!style!css!../../commonStyles/reset.css';
//import '!style!css!../../commonStyles/font.css';

// class HomeLayout extends React.Component {

//   componentDidUpdate() {
//     const { isLoggedIn } = this.props;
//     if (isLoggedIn) {
//       // browserHistory.replace(redirectUrl)
//     }
//   }

//   maybeRenderNotif() {
//     if (!this.props.isLoggedIn) {
//       return (
//         <div>{this.props.notif}</div>
//       );
//     }
//   }

//   render() {
//     console.debug("check homepage props", this.props);
//     const url = this.props.match.url;
//     return (
//       <div className={homepageStyle.appContainer}>
//         <header className={homepageStyle.header}>
//           <Link to="/">
//             <img className={homepageStyle.logo} src="/img/node.svg" />
//           </Link>
//           <Link className={homepageStyle.signupLink} to='/signup'>sign up</Link>
//           <Link className={homepageStyle.signupLink} to='/login'>Login</Link>
//         </header>
//         <div className={homepageStyle.appContent}>
//           <Switch>
//             <Route exact path={url} render={() => (
//               <div>WELCOME!</div>
//             )} />
//             <Route path='/signup' component={SignupPage} />
//             <Route path='/login' component={LoginPage} />
//           </Switch>
//         </div>
//         <footer className={homepageStyle.footer}>
//           <p>
//             <a href="http://mern.io/" target="_blank" rel="noopener noreferrer">MERN</a> build by hand.
//           </p>
//         </footer>
//       </div>
//     );
//   }
// }
const HomeLayout = (props) => {
  console.debug("check homepage props", props);
  const url = props.match.url;
  return (
    <div className={homepageStyle.appContainer}>
      <header className={homepageStyle.header}>
        <Link to="/">
          <img className={homepageStyle.logo} src="/img/node.svg" />
        </Link>
        <Link className={homepageStyle.signupLink} to='/signup'>sign up</Link>
        <Link className={homepageStyle.signupLink} to='/login'>Login</Link>
      </header>
      <div className={homepageStyle.appContent}>
        <ListeningRouter>
          <Switch>
            <Route exact path='/' render={() => (
              <div>
                <h1>WELCOME</h1>
                <div>Free tracker is a service let you easily track your invoices and payment as a freelancer, enjoy!</div>
              </div>
            )} />
            <Route exact path='/signup' component={SignupPage} />
            <Route exact path='/login' component={LoginPage} />
          </Switch>
        </ListeningRouter>
      </div>
      <footer className={homepageStyle.footer}>
        <p>
          <a href="http://mern.io/" target="_blank" rel="noopener noreferrer">MERN</a> build by hand.
        </p>
      </footer>
    </div>
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
    currentURL: ownProps.location.pathname,
    notif: state.login.notif,
    redirectUrl: state.login.redirectUrl,
    extras: state.login.extras
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignupClick: (value) => {
      dispatch(userSignup(value))
    },
    resetNotif: () => { dispatch(resetNotif()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
