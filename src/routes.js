import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/layout/layout';
import IndexPage from './components/indexPage/indexPage';
import SignupPage from './components/signupPage/signupPage';
//import AthletePage from './components/AthletePage';
//import NotFoundPage from './components/NotFoundPage';


const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage}/>
        <Route path="/signup" component={SignupPage}/>
        {/*<Route path="athlete/:id" component={AthletePage}/>*/}
        {/*<Route path="*" component={NotFoundPage}/>*/}
    </Route>
);

export default routes;