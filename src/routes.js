import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/layout';
import HomeLayout from './components/homepageLayout/homepageLayout';
import AppLayout from './components/appLayout/appLayout';
import IndexPage from './components/indexPage/indexPage';
import SignupPage from './components/signupPage/signupPage';
import LoginPage from './components/loginPage/loginPage';
import Dashboard from './components/dashboard/dashboard';
import UserInfo from './components/userInfo/userInfo';
//import AthletePage from './components/AthletePage';
//import NotFoundPage from './components/NotFoundPage';


// good discussion on nested IndexRoute (sort of)
// https://github.com/ReactTraining/react-router/issues/1950#issuecomment-166742102
const routes = (
    <Route path="/" component={Layout}>
        <Route component={HomeLayout}>
            <IndexRoute component={IndexPage}/>
            <Route path="/signup" component={SignupPage}/>
            <Route path="/login" component={LoginPage}/>
            {/*<Route path="invoice/:id" component={InvoicePage}/>*/}
            {/*<Route path="*" component={NotFoundPage}/>*/}
        </Route>
        <Route path="/me" component={AppLayout}>
            <IndexRoute component={Dashboard}/>
            <Route path="/me/info" component={UserInfo}/>
        </Route>
    </Route>
);

export default routes;