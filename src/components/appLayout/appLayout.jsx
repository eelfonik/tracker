import React from 'react';
import { Link, browserHistory } from 'react-router';
import {connect} from 'react-redux';
import appStyle from './appLayout.css';
import {userLogOut,getUserInfo} from '../../store/actions';
// This imported styles globally without running through CSS Modules
// see https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
//import '!style!css!../../commonStyles/reset.css';
//import '!style!css!../../commonStyles/font.css';

class AppLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, currentURL } = this.props;

        if (!this.props.isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            //dispatch(setRedirectUrl(currentURL))
            browserHistory.replace(this.props.redirectUrl)
        }
        //here said it's a bad way to get data from server
        //http://stackoverflow.com/a/33924707/6849186
        // - we will call this when link to any children component, where only profile need this, it's bad
        // - also we may need this info to every invoice
        this.props.onStartUp();
    }

    componentDidUpdate() {
        const { dispatch, currentURL } = this.props;

        if (!this.props.isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            //dispatch(setRedirectUrl(currentURL))
            browserHistory.replace(this.props.redirectUrl)
        }
    }

    componentWillUnmount(){
        browserHistory.replace(this.props.redirectUrl);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        const children = this.props.isLoggedIn? this.props.children: <div>please login</div>;
        const mayLogout = this.props.isLoggedIn? <div className={appStyle.signupLink} onClick={e=>this.props.onLogoutClick()}>Logout</div>:null;
        const userName = this.props.extras.userProfileModel? this.props.extras.userProfileModel.username:'';
        return (
            <div className={appStyle.appContainer}>
                <header className={appStyle.header}>
                    <Link to="/">
                        <img className={appStyle.logo} src="/img/node.svg"/>
                    </Link>
                    <Link to="/me">Hello {this.capitalizeFirstLetter(userName)}</Link>
                    <Link to="/me/invoices">My invoices</Link>
                    <Link to="/me/info">Profile</Link>
                    {mayLogout}
                </header>
                <div className={appStyle.appContent}>
                    {children}
                </div>
                <footer className={appStyle.footer}>

                </footer>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.login.isLoggedIn,
        currentURL: ownProps.location.pathname,
        redirectUrl: state.login.redirectUrl,
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
        onStartUp: getUserInfo,
        onLogoutClick : userLogOut
    }
    //mapDispatchToProps
)(AppLayout);