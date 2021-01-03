import * as React from 'react';
import { makeStyles, Grid, Menu, ButtonBase, useTheme, Theme } from '@material-ui/core';
import { CustomColours } from '@types';
import { Hues } from '../themes';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import { PaperCard } from '../atoms/PaperCard';
import { useField } from 'formik';
import clsx from 'clsx';

const useTabStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 100,
    width: 100,
  },
  rootButton: {
    background: `conic-gradient(
      from 90deg,
      ${theme.palette.red.main},
      ${theme.palette.orange.main},
      ${theme.palette.yellow.main},
      ${theme.palette.green.main},
      ${theme.palette.turquoise.main},
      ${theme.palette.cyan.main},
      ${theme.palette.blue.main},
      ${theme.palette.purple.main},
      ${theme.palette.violet.main},
      ${theme.palette.red.main}
    )`,
  },
  colourButton: {
    boxShadow: theme.shadows[2],
    content: "''",
    position: 'relative',
    borderRadius: '50%',
    height: 'auto',
    paddingTop: '100%',
    margin: 'auto',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    '&:active': {
      transform: 'scale(0.97)',
    },
    [theme.breakpoints.only('xs')]: { width: 15 },
    [theme.breakpoints.only('sm')]: { width: 25 },
    [theme.breakpoints.only('md')]: { width: 35 },
    [theme.breakpoints.only('lg')]: { width: 45 },
    [theme.breakpoints.only('xl')]: { width: 55 },
  },
  menu: {
    '& ul': {
      padding: '0 !important',
    },
  },
  container: {
    [theme.breakpoints.only('xs')]: { width: 60 },
    [theme.breakpoints.only('sm')]: { width: 100 },
    [theme.breakpoints.up('md')]: { width: 140 },
    height: 'auto',
  },
  wrapper: {
    display: 'flex',
    [theme.breakpoints.only('xs')]: { padding: 1 },
    [theme.breakpoints.only('sm')]: { padding: 2 },
    [theme.breakpoints.up('md')]: { padding: 5 },
  },
}));

type ColourPickerProps = {
  name: string;
};

export const ColourPicker: React.FC<ColourPickerProps> = ({ name }) => {
  const cs = useTabStyles();
  const { palette } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [, , helpers] = useField<CustomColours>(name);

  const handlerEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ButtonBase onMouseEnter={handlerEnter}>
        <div className={clsx(cs.rootButton, cs.colourButton)}></div>
      </ButtonBase>
      <Menu
        id="colour-menu"
        className={cs.menu}
        anchorEl={anchorEl}
        keepMounted
        onClick={(e) => e.preventDefault()}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <PaperCard onMouseLeave={handleClose}>
          <Grid container className={cs.container}>
            {Object.keys(Hues).map((c: CustomColours, i) => {
              if (i > 11) return <></>;
              return (
                <Grid key={i} item xs={3} className={cs.wrapper}>
                  <ButtonBase
                    onClick={() => {
                      helpers.setValue(c);
                      handleClose();
                    }}
                    className={cs.colourButton}
                    style={{ backgroundColor: (palette[c] as PaletteColor).main }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </PaperCard>
      </Menu>
    </div>
  );
};
