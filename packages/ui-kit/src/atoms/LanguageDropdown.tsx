import * as React from 'react';
import { makeStyles, Theme, Select, MenuItem } from '@material-ui/core';

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

type Languages = 'en' | 'fr' | 'de';

type LanguageDropdownProps = {
  setLanguage: (i) => void;
  defaultLang: Languages;
};

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ setLanguage, defaultLang }) => {
  const cs = useTabStyles();
  const [value, setValue] = React.useState<Languages>(defaultLang);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const val = event.target.value as Languages;
    setValue(val);
    setLanguage(val);
  };

  // TODO:
  // React.useEffect(() => {
  //   fetch('http://ip-api.com/json').then((response) => {
  //     console.log("User's Location Data is ", response);
  //     console.log("User's Country", response.country);
  //     setValue(response.country);
  //   });
  // }, [value]);

  return (
    <div className={cs.root}>
      <Select
        variant="outlined"
        id="language-label"
        value={value}
        onChange={handleChange}
        classes={{ root: cs.override, outlined: cs.fontSize }}
      >
        <MenuItem value="en">🇬🇧 English</MenuItem>
        <MenuItem value="es">🇪🇸 Español</MenuItem>
        <MenuItem value="fr">🇫🇷 Français</MenuItem>
        <MenuItem value="pt">🇵🇹 Português</MenuItem>
        <MenuItem value="de">🇩🇪 Deutsche</MenuItem>
        <MenuItem value="ru">🇷🇺 Русский язык</MenuItem>
        <MenuItem value="pl">🇵🇱 Polski</MenuItem>
        <MenuItem value="ja">🇯🇵 日本語</MenuItem>
        <MenuItem value="zh">🇹🇼 中文</MenuItem>
        <MenuItem value="et">🇪🇪 eesti keel</MenuItem>
        <MenuItem value="lv">🇱🇻 latviešu valoda</MenuItem>
        <MenuItem value="ro">🇷🇴 limba română</MenuItem>
        <MenuItem value="uk">🇺🇦 Українська</MenuItem>
        <MenuItem value="bg">🇧🇬 български</MenuItem>
        <MenuItem value="cs">🇨🇿 čeština</MenuItem>
        <MenuItem value="sl">🇸🇮 slovenščina</MenuItem>
      </Select>
    </div>
  );
};
