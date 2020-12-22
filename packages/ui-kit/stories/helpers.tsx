import * as React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import useViewportSize from '../src/definitions/useViewportSize';
import { Variant } from '@material-ui/core/styles/createTypography';

export const Container: React.FC<{ title: string }> = ({ title, children }) => {
  const vps = useViewportSize();

  const variant: Variant = (() => {
    switch (vps) {
      case 'xs': {
        return 'body2';
      }
      case 'sm': {
        return 'body1';
      }
      case 'md': {
        return 'h4';
      }
      default: {
        return 'h2';
      }
    }
  })();

  return (
    <Box clone style={{ backgroundColor: '#ffe57f' }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant={variant}>{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
