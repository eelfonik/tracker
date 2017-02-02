import React from 'react';
import { Link, browserHistory } from 'react-router';
import {connect} from 'react-redux';
import style from './homepageLayout.css';
// This imported styles globally without running through CSS Modules
// see https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
import '!style!css!../../commonStyles/reset.css';
import '!style!css!../../commonStyles/font.css';

class HomeLayout extends React.Component {

    componentDidMount() {
        const { dispatch, currentURL, isLoggedIn, redirectUrl} = this.props;

        if (isLoggedIn) {
            //see https://medium.com/the-many/adding-login-and-authentication-sections-to-your-react-or-react-native-app-7767fd251bd1#.lcuolmcpq
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            //dispatch(setRedirectUrl(currentURL))
            browserHistory.replace(redirectUrl)
        }
    }

    componentDidUpdate() {
        const { dispatch, currentURL, isLoggedIn, redirectUrl} = this.props;
        if (isLoggedIn) {
            browserHistory.replace(redirectUrl)
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
        return (
            <div className={style.appContainer}>
                <header className={style.header}>
                    <Link to="/">
                        <img className={style.logo} src="/img/node.svg"/>
                    </Link>
                    <Link className={style.signupLink} to="/signup">sign up</Link>
                    <Link className={style.signupLink} to="/login">Login</Link>
                </header>
                <div className={style.appContent}>{this.props.children}</div>
                {this.maybeRenderNotif()}
                <footer className={style.footer}>
                    <p>
                        <a href="http://mern.io/" target="_blank" rel="noopener noreferrer">MERN</a> build by hand.
                    </p>
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.login.isLoggedIn,
        currentURL: ownProps.location.pathname,
        notif: state.login.notif,
        redirectUrl: state.login.redirectUrl,
        extras: state.login.extras
    }
}

export default connect(mapStateToProps)(HomeLayout);