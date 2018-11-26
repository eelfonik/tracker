import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import GlobalReset from './commonStyles/reset'
import GlobalFont from './commonStyles/font'
// the apollo react part
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const rootEl = document.getElementById('root');

const ApolloApp = (App: React.FunctionComponent) => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
ReactDOM.render(
  <React.Fragment>
    <GlobalReset />
    <GlobalFont />
    {ApolloApp(App)}
  </React.Fragment>,
  rootEl
);
