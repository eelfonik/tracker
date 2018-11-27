import * as React from 'react';
import { Link, Redirect, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components'

import { connect } from 'react-redux';
import { capitalizeFirstLetter } from '../helpers/capitalizeFirstLetter'
import { Login } from '../store/types'

import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';

import Dashboard from './dashboard';
import UserInfo from './userInfo';
import UserInvoices from './userInvoices';

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

type StateProps = Pick<Login, 'isLoggedIn' | 'extras' | 'match'>

const GET_USER = gql`
 query user {
  success
  extras
 }
`

const LOG_OUT = gql`
 mutation Logout() {
   logout() {
    success
   }
 }
`

function AppLayout(props: StateProps) {
  const isLoggedIn = React.useContext(LoginContext)
  const url = props.match.url;
  return props.isLoggedIn ? (
    <Query query={GET_USER}>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>Loading</div>
        }
        if (error) {
          return <div>sth went wrong</div>
        }
        return (
          <BrowserRouter>
            <AppContainer>
              <AppHeader>
                <Link to='/'>
                  <LogoImg src="/img/node.svg" />
                </Link>
                <Link to={`${url}`}>Hello {capitalizeFirstLetter(data.extras.userProfileModel.username)}</Link>
                <Link to={`${url}/invoices`}>My invoices</Link>
                <Link to={`${url}/info`}>Profile</Link>
                <Mutation mutation={LOG_OUT}>
                  {(logout, {data}) => (
                    <div onClick={e => {
                      e.preventDefault();
                      logout()
                    }}>Logout</div>
                  )}
                </Mutation>
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
        )
      }}
    </Query>
  ) :
  (<Redirect to="/"/>);
}

const mapStateToProps = ({loginInfo} : {Login}, ownProps: any) => {
    return {
      isLoggedIn: loginInfo.isLoggedIn,
      currentURL: ownProps.location.pathname,
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
  // {
  //   getInfo: getUserInfo,
  //   getInvoices: getUserInvoices,
  //   onLogoutClick: userLogOut
  // }
  //mapDispatchToProps
)(AppLayout);