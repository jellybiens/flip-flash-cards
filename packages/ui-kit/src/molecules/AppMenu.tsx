import * as React from 'react';
import { AppHeader, AppHeaderProps } from '../atoms/AppHeader';
import { LanguageDropdownProps } from '../atoms/LanguageDropdown';
import { SettingsDrawer, SettingsDrawerProps } from '../atoms/SettingsDrawer';

export type AppMenuProps = { headerNav: AppHeaderProps['navigation'] } & {
  settingsNav: SettingsDrawerProps['navigation'];
} & LanguageDropdownProps;

export const AppMenu: React.FC<AppMenuProps> = ({
  headerNav,
  settingsNav,
  ...languageProps
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <AppHeader {...{ open, setOpen, navigation: { ...headerNav } }} />
      <SettingsDrawer
        {...{ open, setOpen, navigation: { ...settingsNav }, ...languageProps }}
      />
    </>
  );
};
