import * as SvgIcons from '@material-ui/icons';

export type IconNames =
  | 'search'
  | 'add'
  | 'addImage'
  | 'image'
  | 'save'
  | 'create'
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
  | 'new'
  | 'trending'
  | 'myDecks'
  | 'account'
  | 'menu'
  | 'info'
  | 'law'
  | 'deleteAll'
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
  create: SvgIcons.Create,
  brush: SvgIcons.Brush,
  bin: SvgIcons.Delete,

  tick: SvgIcons.Check,
  cross: SvgIcons.Clear,
  next: SvgIcons.Redo,
  prev: SvgIcons.Undo,
  rotate: SvgIcons.RotateRight,
  flip: SvgIcons.Flip,

  starFilled: SvgIcons.Star,
  starUnfilled: SvgIcons.StarBorder,
  share: SvgIcons.Share,

  new: SvgIcons.Schedule,
  trending: SvgIcons.TrendingUp,
  myDecks: SvgIcons.RecentActors,
  account: SvgIcons.AccountCircle,
  menu: SvgIcons.Reorder,
  info: SvgIcons.Info,
  law: SvgIcons.Gavel,
  deleteAll: SvgIcons.DeleteForever,
  cog: SvgIcons.Settings,

  practice: SvgIcons.FitnessCenter,
  gTranslate: SvgIcons.GTranslate,
  diplomaHat: SvgIcons.School,
};

export const IconKeys = Object.keys(Icons);
