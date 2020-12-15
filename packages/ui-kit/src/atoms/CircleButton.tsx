import * as React from 'react';
import { IconButton, IconButtonProps, makeStyles, Theme } from '@material-ui/core';
import * as SvgIcons from '@material-ui/icons';

const Icons: { [key: string]: SvgIcons.SvgIconComponent } = {
  search: SvgIcons.Search,
  add: SvgIcons.Add,
  remove: SvgIcons.Remove,
  addImage: SvgIcons.AddPhotoAlternate,
  image: SvgIcons.Image,
  save: SvgIcons.Backup,
  pencil: SvgIcons.Create,
  brush: SvgIcons.Brush,
  bin: SvgIcons.Delete,

  tick: SvgIcons.Check,
  cross: SvgIcons.Clear,
  next: SvgIcons.NavigateNext,
  prev: SvgIcons.Undo,

  starFilled: SvgIcons.Star,
  starUnfulled: SvgIcons.StarBorder,
  share: SvgIcons.Share,

  account: SvgIcons.AccountCircle,
  menu: SvgIcons.Reorder,
  cog: SvgIcons.Settings,

  practice: SvgIcons.FitnessCenter,
  gTranslate: SvgIcons.GTranslate,
  diplomaHat: SvgIcons.School,
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      margin: 'auto',
      display: 'flex',
      padding: theme.spacing(1),
    },
  };
});

const iconNames = Object.keys(Icons);
const namesArray = [...iconNames] as const;
type IconNames = typeof namesArray[number];

// type IconNames = keyof typeof Icons;

export type CircleButtonProps = Omit<IconButtonProps, 'aria-label'> & {
  iconComponent: IconNames;
};

export const CircleButton: React.FC<CircleButtonProps> = ({ iconComponent, ...props }) => {
  const cs = useStyles();

  const IconComponent = Icons[iconComponent];

  return (
    <IconButton aria-label={iconComponent} {...props}>
      <IconComponent fontSize="inherit" />
    </IconButton>
  );
};
