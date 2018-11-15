import * as React from 'react';
import { Link, Redirect, Switch, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components'

import { connect } from 'react-redux';
import { userLogOut, getUserInfo, getUserInvoices } from '../store/actions';
import { capitalizeFirstLetter } from '../helpers/capitalizeFirstLetter'
import { AppActionProps, AppState, LoginState } from '../store/types'

import Dashboard from './appLayout/dashboard/dashboard';
import UserInfo from './appLayout/userInfo/userInfo';
import UserInvoices from './appLayout/userInvoices/userInvoices';

const AppContainer = styled.div`
  margin: 20px;
`

const AppHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & a {
      text-decoration: none;
      color: color(black alpha(50%));
  }
`

// const SignUpLink = styled(Link)`
//   text-decoration: none;
//   color: rgba(0, 234, 107,1);
//   border-bottom: 1px solid transparent;
//   &:hover {
//       border-bottom: 1px solid rgba(0, 234, 107,1);
//   }
// `

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
  display: flex;
  align-items: center;
  justify-content: space-between;
`

type StateProps = Pick<LoginState, 'isLoggedIn' | 'extras'>

function AppLayout(props: StateProps & AppActionProps) {

  React.useEffect(() => {
    props.getInfo();
    props.getInvoices();
  }, [])

  const url = props.match.url;
  const userName = props.extras && props.extras.userProfileModel ? props.extras.userProfileModel.username : '';
  return props.isLoggedIn ? (
    <BrowserRouter>
      <AppContainer>
        <AppHeader>
          <Link to='/'>
            <LogoImg src="/img/node.svg" />
          </Link>
          <Link to={`${url}`}>Hello {capitalizeFirstLetter(userName)}</Link>
          <Link to={`${url}/invoices`}>My invoices</Link>
          <Link to={`${url}/info`}>Profile</Link>
          <div onClick={e => props.onLogoutClick()}>Logout</div>
        </AppHeader>
        <AppContent>
          <Route path={`${url}/invoices`} component={UserInvoices} />
          <Route path={`${url}/info`} component={UserInfo} />
          <Route exact path={`${url}`} component={Dashboard} />
        </AppContent>
        <AppFooter>

        </AppFooter>
      </AppContainer>
    </BrowserRouter>
  ) :
  (<Redirect to="/"/>);
}

const mapStateToProps = (state: AppState, ownProps) => {
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
//NOTE!! that only works with functions has no arguments!!!

export default connect(
  mapStateToProps,
  {
    getInfo: getUserInfo,
    getInvoices: getUserInvoices,
    onLogoutClick: userLogOut
  }
  //mapDispatchToProps
)(AppLayout);