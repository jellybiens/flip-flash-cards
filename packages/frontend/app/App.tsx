import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '@ui-kit';
import { AllDecksPage } from '../modules/AllDecks';
import { PlayDeckPage } from '../modules/PlayDeck';

const apolloClient = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App: React.FC = () => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Redirect path="/" to="/AllDecks" exact />

          <Route path="/AllDecks" component={AllDecksPage} />
          <Route path="/PlayDeck/:deckId" component={PlayDeckPage} />
          <Route path="/MyDecks" component={() => <></>} />
          <Route path="/CreateDeck" component={() => <></>} />

          <Route path="/About" component={() => <></>} />
          <Route path="/ClearData" component={() => <></>} />
        </Switch>
      </MuiThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
