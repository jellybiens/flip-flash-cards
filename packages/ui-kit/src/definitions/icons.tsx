import * as SvgIcons from '@material-ui/icons';

export type IconNames =
  | 'search'
  | 'add'
  | 'addImage'
  | 'image'
  | 'save'
  | 'pencil'
  | 'brush'
  | 'bin'
  | 'tick'
  | 'cross'
  | 'next'
  | 'prev'
  | 'rotate'
  | 'flip'
  | 'starFilled'
  | 'starUnfulled'
  | 'share'
  | 'account'
  | 'menu'
  | 'cog'
  | 'practice'
  | 'gTranslate'
  | 'diplomaHat';

export const Icons: { [key: string]: SvgIcons.SvgIconComponent } = {
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
  rotate: SvgIcons.RotateRight,
  flip: SvgIcons.Flip,

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

export const IconKeys = Object.keys(Icons);
