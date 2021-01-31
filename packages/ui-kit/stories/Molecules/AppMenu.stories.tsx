import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AppMenu, AppMenuProps } from '@ui-kit';

const title = 'AppMenu';

const Story = () => {
  const props: AppMenuProps = {
    headerNav: {
      paypal: () => alert('paypal'),
      bitcoin: () => alert('btc'),
      ethereum: () => alert('eth'),
    },
    settingsNav: {
      browseDecks: () => alert('browse-decks'),
      mydecks: () => alert('my-decks'),
      createdeck: () => alert('create-deck'),
      about: () => alert('about'),
      cleardata: () => alert('clear-data'),
    },
    defaultLang: 'fr',
    setLanguage: (lang) => alert(lang),
  };

  return <AppMenu {...props} />;
};

storiesOf('Core/Molecules', module).add(title, Story);
