import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, Select, MenuItem, SelectProps } from '@material-ui/core';
import { Languages } from '@types';

const useTabStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 7,
    borderRadius: 8,
    backgroundColor: theme.palette.white.main,
  },
  fontSize: {
    [theme.breakpoints.down('md')]: { fontSize: '0.9em' },
    [theme.breakpoints.up('lg')]: { fontSize: '0.9em' },
    [theme.breakpoints.up('xl')]: { fontSize: '1em' },
  },
  override: {
    padding: 6,
  },
}));

export type LanguageDropdownProps = {
  setLanguage: (i) => void;
  defaultLang: Languages;
};

export const LanguageDropdown: React.FC<LanguageDropdownProps & SelectProps> = ({
  setLanguage,
  defaultLang,
  ...selectProps
}) => {
  const cs = useTabStyles();
  const [value, setValue] = React.useState<Languages>(defaultLang);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const val = event.target.value as Languages;
    setValue(val);
    setLanguage(val);
  };

  return (
    <div className={clsx(cs.root, selectProps.className)}>
      <Select
        variant="outlined"
        id="language-label"
        value={value}
        onChange={handleChange}
        classes={{ root: cs.override, outlined: cs.fontSize }}
        {...selectProps}
      >
        <MenuItem value="en">🇬🇧 English</MenuItem>
        <MenuItem value="es">🇪🇸 Español</MenuItem>
        <MenuItem value="fr">🇫🇷 Français</MenuItem>
        <MenuItem value="pt">🇵🇹 Português</MenuItem>
        <MenuItem value="de">🇩🇪 Deutsch</MenuItem>
        <MenuItem value="ru">🇷🇺 Русский язык</MenuItem>
        <MenuItem value="ja">🇯🇵 日本語</MenuItem>
        {/* <MenuItem value="pl">🇵🇱 Polski</MenuItem>
        <MenuItem value="zh">🇹🇼 中文</MenuItem>
        <MenuItem value="et">🇪🇪 eesti</MenuItem>
        <MenuItem value="lv">🇱🇻 latviešu valoda</MenuItem>
        <MenuItem value="ro">🇷🇴 limba română</MenuItem>
        <MenuItem value="uk">🇺🇦 Українська</MenuItem>
        <MenuItem value="bg">🇧🇬 български</MenuItem>
        <MenuItem value="cs">🇨🇿 čeština</MenuItem>
        <MenuItem value="sl">🇸🇮 slovenščina</MenuItem> */}
      </Select>
    </div>
  );
};
