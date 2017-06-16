import React from 'react';
// import { Link, browserHistory } from 'react-router';
import { Switch, BrowserRouter, Route, Link } from 'react-router-dom';

import {connect} from 'react-redux';
import globalStyle from '../../commonStyles/reset.css';
import font from '../../commonStyles/font.css';
import appStyle from './appLayout.css';
import {userLogOut,getUserInfo, getUserInvoices} from '../../store/actions';
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
        const { dispatch, currentURL } = this.props;

        if (!this.props.isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            //dispatch(setRedirectUrl(currentURL))
            BrowserRouter.replace(this.props.redirectUrl)
        }
        //here said it's a bad way to get data from server
        //http://stackoverflow.com/a/33924707/6849186
        // - we will call this when link to any children component, where only profile need this, it's bad
        // - also we may need this info to every invoice
        this.props.getInfo();
        this.props.getInvoices();
    }

    componentDidUpdate() {
        const { dispatch, currentURL } = this.props;

        if (!this.props.isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            //dispatch(setRedirectUrl(currentURL))
            BrowserRouter.replace(this.props.redirectUrl)
        }
    }

    componentWillUnmount(){
        BrowserRouter.replace(this.props.redirectUrl);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        console.debug("chekc route component props", this.props);
        const url = this.props.match.url;
        const userName = this.props.extras.userProfileModel? this.props.extras.userProfileModel.username:'';
        return (
            <div className={appStyle.appContainer}>
                <header className={appStyle.header}>
                    <Link to='/'>
                        <img className={appStyle.logo} src="/img/node.svg"/>
                    </Link>
                    <Link to={`${url}`}>Hello {this.capitalizeFirstLetter(userName)}</Link>
                    <Link to={`${url}/invoices`}>My invoices</Link>
                    <Link to={`${url}/info`}>Profile</Link>
                    <div className={appStyle.signupLink} onClick={e=>this.props.onLogoutClick()}>Logout</div>
                </header>
                <div className={appStyle.appContent}>
                    <Switch>
                        <Route exact path={`${url}`} Component={Dashboard}/>
                        <Route path={`${url}/invoices`} component={UserInvoices}/>
                        <Route path={`${url}/info`} component={UserInfo}/>
                    </Switch>
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
        getInfo: getUserInfo,
        getInvoices: getUserInvoices,
        onLogoutClick : userLogOut
    }
    //mapDispatchToProps
)(AppLayout);