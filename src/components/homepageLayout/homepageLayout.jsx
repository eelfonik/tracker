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
        const { dispatch, currentURL } = this.props;

        if (this.props.isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            //dispatch(setRedirectUrl(currentURL))
            browserHistory.replace("/me")
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
    console.log('homepage',state);
    return {
        isLoggedIn: state.isLoggedIn,
        currentURL: ownProps.location.pathname
    }
}

export default connect(mapStateToProps)(HomeLayout);