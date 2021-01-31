import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '@ui-kit';

const apolloClient = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

import App from './app/App';

ReactDOM.render(
  <>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </>,
  document.getElementById('root'),
);
