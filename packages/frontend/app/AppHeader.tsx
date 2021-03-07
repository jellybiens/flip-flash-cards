import * as React from 'react';
import { useNavigate } from '../utils';
import { AppMenu as UiKitAppMenu, AppMenuProps } from '@components';

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();

  const props: AppMenuProps = {
    headerNav: {
      paypal: () => alert('paypal'),
      bitcoin: () => alert('btc'),
      ethereum: () => alert('eth'),
    },
    settingsNav: {
      browseDecks: () => navigate('/AllDecks'),
      mydecks: () => navigate('/MyDecks'),
      createdeck: () => navigate('/CreateDeck'),
      about: () => navigate('/About'),
      cleardata: () => navigate('/ClearData'),
    },
    defaultLang: 'fr', // TODO: get context
    setLanguage: (lang) => alert(lang), // TODO: set context
  };

  return <UiKitAppMenu {...props} />;
};
