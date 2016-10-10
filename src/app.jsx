import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/appRoutes';

// window.onload = () => {
//     ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
// };


//issue with react hot loader new 3.0.0 to work with HMR
//see https://github.com/maxfarseer/redux-ru-tutorial/issues/2

const rootEl = document.getElementById('root');
ReactDOM.render(
    <AppContainer>
        <AppRoutes />
    </AppContainer>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./components/appRoutes', () => {
        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const NextApp = require('./components/appRoutes').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootEl
        );
    });
}

//ReactDOM.render(<AppRoutes/>, document.getElementById('root'));
