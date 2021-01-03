import * as React from 'react';
import { makeStyles, Theme, Typography, ButtonBase } from '@material-ui/core';

const useTabStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: 'fit-content',
    position: 'static',
    top: 0,
    left: 0,
  },
  typography: {
    [theme.breakpoints.only('xs')]: { ...theme.typography.body2 },
    [theme.breakpoints.only('sm')]: { ...theme.typography.body1 },
    [theme.breakpoints.up('md')]: { ...theme.typography.h3 },
    [theme.breakpoints.up('lg')]: { ...theme.typography.h2 },
  },
  tabActive: {
    paddingBottom: 5,
    border: `5px solid ${theme.palette.primary.main}`,
    borderBottom: `0px`,
    borderRadius: '10px 10px 0px 0px',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.paper,
  },
  tabInactive: {
    border: `5px solid ${theme.palette.primary.main}`,
    borderRadius: '10px 10px 0px 0px',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.dull.light,
  },
}));

type TabsProps = {
  tabs: string[];
  visibleTab: number;
  setVisibleTab: (i) => void;
};

export const Tabs: React.FC<TabsProps> = ({ tabs, visibleTab: vt, setVisibleTab }) => {
  const cs = useTabStyles();

  return (
    <div className={cs.root}>
      {tabs.map((v, i) => (
        <ButtonBase
          key={i}
          className={vt === i ? cs.tabActive : cs.tabInactive}
          style={{ width: `${100 / tabs.length}%` }}
          onClick={() => setVisibleTab(i)}
        >
          <Typography className={cs.typography}>{v}</Typography>
        </ButtonBase>
      ))}
    </div>
  );
};

const usePanelStyles = makeStyles(() => ({
  root: {
    height: 'calc(100% - 48px)',
    position: 'relative',
  },
}));

interface TabPanelProps {
  index: number;
  value: number;
}

export const TabPanel: React.FC<TabPanelProps> = ({ index, value, children }) => {
  if (index !== value) return <></>;

  const cs = usePanelStyles();

  return <div className={cs.root}>{children}</div>;
};
