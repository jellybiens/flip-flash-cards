import * as React from 'react';
import { CountryLanguages } from '@types';
import { AppHeader } from './AppHeader';
import { AppRouter } from './AppRouter';

const App: React.FC = () => {
  /* TODO:
   * get user id from local storage
   * get user language from local storage
   * set both in context
   * if dont exist, get language code and set new user
   *
   * query user scores
   *
   * set langaue slect to update context of language
   * querys to use context language
   *
   * make page on router just be a component to wrap pages in
   */

  React.useEffect(() => {
    void fetch('http://ip-api.com/json')
      .then((response) => response.json())
      .then((response: { countryCode: string }) => {
        console.log("User's Location Data is ", response.countryCode);
        console.log(response.countryCode, CountryLanguages[response.countryCode]);
      });
  }, []);

  return (
    <>
      <AppHeader />
      <AppRouter />
    </>
  );
};

export default App;
