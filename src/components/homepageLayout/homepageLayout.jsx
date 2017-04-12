import React from 'react';
import PropTypes from 'prop-types';
// import { Link, browserHistory } from 'react-router';
import { Switch, BrowserRouter, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import homepageStyle from './homepageLayout.css';
import SignupPage from './signupPage/signupPage';
import LoginPage from './loginPage/loginPage';
// This imported styles globally without running through CSS Modules
// see https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
//import '!style!css!../../commonStyles/reset.css';
//import '!style!css!../../commonStyles/font.css';

class HomeLayout extends React.Component {

    componentDidUpdate() {
        const { isLoggedIn } = this.props;
        if (isLoggedIn) {
            // browserHistory.replace(redirectUrl)
        }
    }

    maybeRenderNotif(){
        if (!this.props.isLoggedIn) {
            return(
                <div>{this.props.notif}</div>
            );
        }
    }

    render() {
        const url = this.props.match.url;
        return (
            <div className={homepageStyle.appContainer}>
                <header className={homepageStyle.header}>
                    <Link to="/">
                        <img className={homepageStyle.logo} src="/img/node.svg"/>
                    </Link>
                    <Link className={homepageStyle.signupLink} to="/signup">sign up</Link>
                    <Link className={homepageStyle.signupLink} to="/login">Login</Link>
                </header>
                <Switch className={homepageStyle.appContent}>
                    <div className="home">
                        WELCOME!
                    </div>
                    <Route path='/signup' component={SignupPage}/>
                    <Route path='/login' component={LoginPage}/>
                </Switch>
                {this.maybeRenderNotif()}
                <footer className={homepageStyle.footer}>
                    <p>
                        <a href="http://mern.io/" target="_blank" rel="noopener noreferrer">MERN</a> build by hand.
                    </p>
                </footer>
            </div>
        );
    }
}
HomeLayout.propTypes = {
    isLoggedIn: PropTypes.bool,
    notif: PropTypes.string,
    extras: PropTypes.object,
}

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