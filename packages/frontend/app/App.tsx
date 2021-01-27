import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '@ui-kit';
import { AppHeader } from './AppHeader';
import { AppRouter } from './AppRouter';

const apolloClient = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App: React.FC = () => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider theme={theme}>
        <AppHeader />
        <AppRouter />
      </MuiThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
